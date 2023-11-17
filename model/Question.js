const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    },
    topic: {
        type: String,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    marks: {
        type: Number,
        default: 1
    }
});

module.exports = QuestionCollection = mongoose.model('QuestionCollection', Question);