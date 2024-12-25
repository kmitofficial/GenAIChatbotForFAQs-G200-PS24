const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');

// Feedback Schema
const feedbackSchema = mongoose.Schema({
    feedback: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Query Schema with Indexing for Efficient Search
const querySchema = mongoose.Schema({
    query: { type: String, required: true },
    response: { type: String, required: true },
    embeddings: { type: [Number], required: true }, // Stored as an array
    time: { type: Date, default: Date.now }
});

// Sanitize Middleware to Prevent Injection Attacks
querySchema.pre('save', function (next) {
    this.query = sanitize(this.query);
    next();
});

feedbackSchema.pre('save', function (next) {
    this.feedback = sanitize(this.feedback);
    next();
});

// Index on Query Time for Faster Retrieval
querySchema.index({ time: -1 });

const QueryModel = mongoose.model('Query', querySchema);
const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = { QueryModel, FeedbackModel };
