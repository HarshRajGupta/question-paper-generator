const QuestionCollection = require('../model/Question');

const addQuestion = async (req, res) => {
    console.log('DEBUG: Add Question request received');
    const { question, subject, topic, difficulty, marks } = req.body;
    console.log(req.body)
    try {
        console.log(question, subject, topic, difficulty, marks)
        QuestionCollectionObject = new QuestionCollection({
            question,
            subject: subject.toLowerCase(),
            topic: topic.toLowerCase(),
            difficulty: difficulty.toLowerCase(),
            marks
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

const addMultipleQuestions = async (req, res) => {
    console.log('DEBUG: Add Multiple Question request received');
    const { questions } = req.body;
    try {
        if (!questions) return res.status(400).json({
            success: false,
            msg: 'No questions found'
        });
        let count = 0;
        for (let i = 0; i < questions.length; i++) {
            try {
                const { question, subject, topic, difficulty, marks } = questions[i];
                QuestionCollectionObject = new QuestionCollection({
                    question,
                    subject: subject.toLowerCase(),
                    topic: topic.toLowerCase(),
                    difficulty: difficulty.toLowerCase(),
                    marks
                });
                await QuestionCollectionObject.save();
                count++;
            } catch (err) {
                console.error(err.message);
            }
        }
        console.log(`DEBUG: ${count} questions saved`);
        return res.status(200).json({
            success: true,
            msg: `${count} questions saved`
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
        const Questions = await QuestionCollection.find({}, '-__v -_id');
        return res.status(200).json({
            success: true,
            count: Questions.length,
            Question: Questions
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
        const query = {};
        if (subject) query.subject = subject.toLowerCase();
        if (topic) query.topic = topic.toLowerCase();
        if (difficulty) query.difficulty = difficulty.toLowerCase();
        const Questions = await QuestionCollection.find(query, '-__v -_id');
        return res.status(200).json({
            success: true,
            count: Questions.length,
            Question: Questions
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
    addMultipleQuestions,
    getAllQuestions,
    getQuestions
}