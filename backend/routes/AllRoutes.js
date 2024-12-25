const express = require('express');
const axios = require('axios');
const { QueryModel, FeedbackModel } = require('../models/allschema.js');
const sanitize = require('mongo-sanitize');
const { body, validationResult } = require('express-validator');

const allroutes = express.Router();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
allroutes.use(bodyParser.json());

// Utility Function: Cosine Similarity
function calculateCosineSimilarity(vectorA, vectorB) {
    const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
}

// Feedback Route
allroutes.post(
    '/feedback',
    body('feedback').trim().notEmpty().withMessage('Feedback cannot be empty'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { feedback } = req.body;
        try {
            const sanitizedFeedback = sanitize(feedback);
            const newFeedback = new FeedbackModel({ feedback: sanitizedFeedback });
            await newFeedback.save();
            res.status(201).json({ message: "Feedback Saved Successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

// Query Processing Route
allroutes.post(
    '/query',
    body('query').trim().notEmpty().withMessage('Query cannot be empty'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { query } = req.body;
        const sanitizedQuery = sanitize(query);

        try {
            // Step 1: Send Query to NLP Service
            console.log("reached nlp")
            const nlpResponse = await axios.post('http://127.0.0.1:4000/embed', { query: sanitizedQuery });
            console.log("done with embeddings")
            const userEmbedding = nlpResponse.data.embedding;
            console.log("NLP Response:", nlpResponse.data);


            if (!Array.isArray(userEmbedding) || userEmbedding.length === 0) {
                return res.status(500).json({ message: "Failed to generate embedding." });
            }

            // Step 2: Retrieve Stored Queries & Compare Using Cosine Similarity
            const allQueries = await QueryModel.find();
            let bestMatch = null;
            let bestScore = 0;

            allQueries.forEach((entry) => {
                if (!entry.embeddings || !Array.isArray(entry.embeddings)) {
                    // console.error("Invalid embeddings in database entry:", entry);
                    return;
                }
                const similarity = calculateCosineSimilarity(userEmbedding, entry.embeddings);
                if (similarity > bestScore) {
                    bestScore = similarity;
                    bestMatch = entry;
                }
            });

            if (bestMatch && bestScore > 0.8) {
                return res.json({ response: bestMatch.response });
            }

            // Step 3: Forward to RAG Pipeline
            console.log("reached rag")
            const ragResponse = await axios.post(process.env.COLLAB_BACKEND_URL, { query: sanitizedQuery });
            console.log("done with rag")
            const ragAnswer = ragResponse.data.message;

            // Step 4: Save New Query & Response
            const newQuery = new QueryModel({
                query: sanitizedQuery,
                response: ragAnswer,
                embeddings: userEmbedding
            });
            await newQuery.save();

            res.json({ response: ragAnswer });
        } catch (error) {
            console.error("Error processing query:", error.message);
            res.status(500).json({ message: "An error occurred while processing the request." });
        }
    }
);

module.exports = allroutes;
