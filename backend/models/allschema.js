const mongoose = require('mongoose');
const { now } = require('mongoose');

const feedbackSchema = mongoose.Schema({
    feedback: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const QuerySchema = mongoose.Schema({
    query: { type: String, required: true },
    response: { type: String, required: true },
    embeddings: { type: String, required: true },
    time: { type: Date, default: Date.now }
});

const QueryModel = mongoose.model('Query', QuerySchema);

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = {FeedbackModel, QueryModel};