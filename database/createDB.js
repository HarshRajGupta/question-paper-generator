const { questions } = require("../data.json");
const QuestionCollection = require('../model/Question');

const addQuestion = async (question, subject, topic, difficulty, marks) => {
    try {
        QuestionCollectionObject = new QuestionCollection({
            question,
            subject: subject.toLowerCase(),
            topic: topic.toLowerCase(),
            difficulty: difficulty.toLowerCase(),
            marks
        });
        await QuestionCollectionObject.save();
        return 1;
    } catch (err) {
        // console.error(err.message);
        return 0;
    }
}

const createDB = async () => {
    console.log('DEBUG: Creating DB from data.json', questions.length, 'questions found');
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
        const { question, subject, topic, difficulty, marks } = questions[i];
        count += await addQuestion(question, subject, topic, difficulty, marks);
    }
    console.log(`DEBUG: ${count} questions saved`);
}

module.exports = createDB;
