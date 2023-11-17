const QuestionCollection = require('../model/Question');

const addQuestion = async (req, res) => {
    console.log('DEBUG: Add Question request received');
    const { question, subject, topic, difficulty, marks } = req.body;
    console.log(req.body)
    try {
        console.log(question, subject, topic, difficulty, marks)
        QuestionCollectionObject = new QuestionCollection({
            question, subject, topic, difficulty, marks
        });
        const Question = await QuestionCollectionObject.save();
        console.log(`DEBUG: Question Saved ${Question._id.toString()}`);
        return res.status(200).json({
            success: true,
            id: Question._id.toString(),
            msg: 'Question saved'
        });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
}

const getAllQuestions = async (req, res) => {
    console.log('DEBUG: Get all Questions request received');
    try {
        const Question = await QuestionCollection.find();
        console.log(`DEBUG: Question sent`);
        return res.status(200).json({
            success: true,
            Question: Question,
            msg: 'Question sent'
        });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
}
const getQuestions = async (req, res) => {
    console.log('DEBUG: Get Questions request received');
    const { subject, topic, difficulty } = req.body;
    try {
        const querry = {};
        if (subject) querry.subject = subject;
        if (topic) querry.topic = topic;
        if (difficulty) querry.difficulty = difficulty;
        const Question = await QuestionCollection.find(querry);
        console.log(`DEBUG: Question sent`);
        return res.status(200).json({
            success: true,
            Question: Question,
            msg: 'Question sent'
        });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
}

module.exports = {
    addQuestion,
    getAllQuestions,
    getQuestions
}