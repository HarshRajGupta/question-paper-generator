const QuestionCollection = require("../model/Question");

const getQuestionSet = async (query) => {
  try {
    const QuestionSet = await QuestionCollection.find(query, "-__v -_id");
    return QuestionSet;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

function pickRandom(arr, marks) {
  const set = [],
    picked = [];
  for (let i = 0; i < arr.length; i++) set.push(arr[i]);
  let total = 0;
  while (set.length > 0 && total < marks) {
    const index = Math.floor(Math.random() * set.length);
    if (total + set[index].marks <= marks) {
      picked.push(set[index]);
      total += set[index].marks;
    }
    set.splice(index, 1);
  }
  return { count: picked.length, set: picked, total };
}

const getQuestionPaper = async (req, res) => {
  console.log("DEBUG: Get Question Paper request received");
  const { subject, topic, easy, medium, hard, marks } = req.body;
  try {
    const query = {};
    if (subject) query.subject = subject.toLowerCase();
    if (topic) query.topic = topic.toLowerCase();
    const EasyQuestionSet = await getQuestionSet({
      ...query,
      difficulty: "easy",
    });
    const MediumQuestionSet = await getQuestionSet({
      ...query,
      difficulty: "medium",
    });
    const HardQuestionSet = await getQuestionSet({
      ...query,
      difficulty: "hard",
    });
    if (!marks) {
      const EasyQuestions = pickRandom(EasyQuestionSet, easy);
      const MediumQuestions = pickRandom(MediumQuestionSet, medium);
      const HardQuestions = pickRandom(HardQuestionSet, hard);
      const Questions = [
        ...EasyQuestions.set,
        ...MediumQuestions.set,
        ...HardQuestions.set,
      ];
      const Total =
        EasyQuestions.total + MediumQuestions.total + HardQuestions.total;
      return res.status(200).json({
        success: true,
        numberOfQuestions: Questions.length,
        questions: Questions,
        easyQuestionSet: EasyQuestions,
        mediumQuestionSet: MediumQuestions,
        hardQuestionSet: HardQuestions,
      });
    } else {
      const sumOfDifficulty = easy + medium + hard;
      const EasyQuestions = pickRandom(
        EasyQuestionSet,
        (easy * marks) / sumOfDifficulty,
      );
      const MediumQuestions = pickRandom(
        MediumQuestionSet,
        (medium * marks) / sumOfDifficulty,
      );
      const HardQuestions = pickRandom(
        HardQuestionSet,
        (hard * marks) / sumOfDifficulty,
      );
      const Questions = [
        ...EasyQuestions.set,
        ...MediumQuestions.set,
        ...HardQuestions.set,
      ];
      const Total =
        EasyQuestions.total + MediumQuestions.total + HardQuestions.total;
      return res.status(200).json({
        success: Total === marks,
        numberOfQuestions: Questions.length,
        questions: Questions,
        easyQuestionSet: EasyQuestions,
        mediumQuestionSet: MediumQuestions,
        hardQuestionSet: HardQuestions,
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = {
  getQuestionPaper,
};
