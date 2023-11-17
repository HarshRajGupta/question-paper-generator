const QuestionCollection = require('../model/Question');

const getQuestionSet = async (query) => {
    try {
        const QuestionSet = await QuestionCollection.find(query, '-__v -_id');
        return QuestionSet
    }
    catch (err) {
        console.error(err.message);
        return []
    }
}

function pickRandom(arr, marks) {
    const set = [], picked = [];
    for (let i = 0; i < arr.length; i++)
        set.push(arr[i]);
    let total = 0;
    while (set.length > 0 && total < marks) {
        const index = Math.floor(Math.random() * set.length);
        if (total + set[index].marks <= marks) {
            picked.push(set[index]);
            total += set[index].marks;
        }
        set.splice(index, 1);
    }
    return { picked, total };
}

const getQuestionPaper = async (req, res) => {
    console.log('DEBUG: Get Question Paper request received');
    const { subject, topic, easy, medium, hard, marks } = req.body;
    try {
        const query = {};
        if (subject) query.subject = subject.toLowerCase();
        if (topic) query.topic = topic.toLowerCase();
        const EasyQuestionSet = await getQuestionSet({ ...query, difficulty: 'easy' });
        const MediumQuestionSet = await getQuestionSet({ ...query, difficulty: 'medium' });
        const HardQuestionSet = await getQuestionSet({ ...query, difficulty: 'hard' });
        if (!marks) {
            const EasyQuestions = pickRandom(EasyQuestionSet, easy), MediumQuestions = pickRandom(MediumQuestionSet, medium), HardQuestions = pickRandom(HardQuestionSet, hard);
            const TotalMarks = EasyQuestions.total + MediumQuestions.total + HardQuestions.total, Question = [...EasyQuestions.picked, ...MediumQuestions.picked, ...HardQuestions.picked];
            return res.status(200).json({
                success: true,
                Question: Question,
                TotalMarks: TotalMarks,
                EasyQuestionSet: EasyQuestions,
                MediumQuestionSet: MediumQuestions,
                HardQuestionSet: HardQuestions,
            });
        } else {
            const sumOfDifficulty = easy + medium + hard;
            const EasyQuestions = pickRandom(EasyQuestionSet, (easy * marks) / sumOfDifficulty), MediumQuestions = pickRandom(MediumQuestionSet, (medium * marks) / sumOfDifficulty), HardQuestions = pickRandom(HardQuestionSet, (hard * marks) / sumOfDifficulty);
            const TotalMarks = EasyQuestions.total + MediumQuestions.total + HardQuestions.total, Question = [...EasyQuestions.picked, ...MediumQuestions.picked, ...HardQuestions.picked];
            return res.status(200).json({
                success: true,
                Question: Question,
                TotalMarks: TotalMarks,
                EasyQuestionSet: EasyQuestions,
                MediumQuestionSet: MediumQuestions,
                HardQuestionSet: HardQuestions,
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
}

module.exports = {
    getQuestionPaper
}