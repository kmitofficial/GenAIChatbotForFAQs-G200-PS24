const express = require('express');
const axios = require("axios");
const { QueryModel,FeedbackModel} = require('../models/allschema.js');
const allroutes = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
allroutes.use(bodyParser.json());

allroutes.post('/feedback', (req, res) => {
    const { feedback } = req.body;

    if (!feedback) {
        console.log("All the fields are required");
        res.status(404).json({ error: "All the fields are required" });
    }

    try {
        const newFeedback = new FeedbackModel({ feedback });
        newFeedback.save();
        console.log("Feedback Saved Successful");
        res.status(201).json({ message: "Feedback Saved Successful" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// collab url
const COLLAB_URL = process.env.COLLAB_BACKEND_URL;

// Endpoint for the chatbot
allroutes.post('/rag', async (req, res) => {
    const userQuery = req.body.query;
    const embedding = req.body.embeddings;
    console.log("EMBEDDINGS", embedding);
    try {
        // Forward query to Google Colab
        console.log("reachead-1");
        const colabResponse = await axios.post(`${COLLAB_URL}`, {
            query: userQuery,
        });
        console.log("reachead-2");


        // Send Colab response back to the frontend
        console.log("Response: ", colabResponse.data.message);
        // store in mongodb
        console.log("reached mongo path");
        const collabAnswer = colabResponse.data.message;
        const newQuery = QueryModel({
            query: userQuery,
            response: collabAnswer,
            embeddings: embedding
        });
        console.log("reached mongo path-2");

        await newQuery.save();
        console.log("Successfully saved in MongoDB");


        // queryroute(userQuery, colabResponse.data.message, 'embeddings'); 
        res.status(202).json({ response: colabResponse.data.message });

    } catch (error) {
        console.error("Error communicating with Colab or saving to mongoDB:", error.message);
        res.status(500).json({ error: "Failed to connect to RAG pipeline." });
    }
});


module.exports = allroutes;