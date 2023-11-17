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
        if (subject) query.subject = subject;
        if (topic) query.topic = topic;
        const EasyQuestionSet = await getQuestionSet({ ...query, difficulty: 'easy' });
        const MediumQuestionSet = await getQuestionSet({ ...query, difficulty: 'medium' });
        const HardQuestionSet = await getQuestionSet({ ...query, difficulty: 'hard' });
        if (easy + medium + hard === 1) {
            const EasyQuestions = pickRandom(EasyQuestionSet, marks * easy);
            const MediumQuestions = pickRandom(MediumQuestionSet, marks * medium);
            const HardQuestions = pickRandom(HardQuestionSet, marks * hard);
            const TotalMarks = EasyQuestions.total + MediumQuestions.total + HardQuestions.total;
            const Question = [...EasyQuestions.picked, ...MediumQuestions.picked, ...HardQuestions.picked];
            console.log(`DEBUG: Question sent`);
            return res.status(200).json({
                success: true,
                Question: Question,
                TotalMarks: TotalMarks,
                EasyQuestionSet: EasyQuestions,
                MediumQuestionSet: MediumQuestions,
                HardQuestionSet: HardQuestions,
                msg: 'Question sent'
            });
        } else if (easy + medium + hard === 100) {
            const EasyQuestions = pickRandom(EasyQuestionSet, (easy * marks) / 100);
            const MediumQuestions = pickRandom(MediumQuestionSet, (medium * marks) / 100);
            const HardQuestions = pickRandom(HardQuestionSet, (hard * marks) / 100);
            const TotalMarks = EasyQuestions.total + MediumQuestions.total + HardQuestions.total;
            const Question = [...EasyQuestions.picked, ...MediumQuestions.picked, ...HardQuestions.picked];
            console.log(`DEBUG: Question sent`);
            return res.status(200).json({
                success: true,
                TotalMarks: TotalMarks,
                Deficit: marks - TotalMarks,
                Question: Question,
                EasyQuestionSet: EasyQuestionSet,
                MediumQuestionSet: MediumQuestionSet,
                HardQuestionSet: HardQuestionSet,
                msg: 'Question sent'
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