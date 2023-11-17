const QuestionCollection = require("../model/Question");

const dataBaseStats = async () => {
  try {
    const results = await QuestionCollection.aggregate([
      {
        $group: {
          _id: {
            subject: "$subject",
            topic: "$topic",
            difficulty: "$difficulty",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.subject",
          count: { $sum: "$count" },
          uniqueTopics: { $sum: 1 },
          easy: {
            $sum: {
              $cond: [{ $eq: ["$_id.difficulty", "easy"] }, "$count", 0],
            },
          },
          medium: {
            $sum: {
              $cond: [{ $eq: ["$_id.difficulty", "medium"] }, "$count", 0],
            },
          },
          hard: {
            $sum: {
              $cond: [{ $eq: ["$_id.difficulty", "hard"] }, "$count", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          subject: "$_id",
          count: 1,
          uniqueTopics: 1,
          easy: 1,
          medium: 1,
          hard: 1,
        },
      },
    ]);
    return results;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const subjectStats = async (subject) => {
  try {
    const results = await QuestionCollection.aggregate([
      {
        $match: {
          subject: subject,
        },
      },
      {
        $group: {
          _id: {
            topic: "$topic",
            difficulty: "$difficulty",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.topic",
          count: { $sum: "$count" },
          easy: {
            $sum: {
              $cond: [{ $eq: ["$_id.difficulty", "easy"] }, "$count", 0],
            },
          },
          medium: {
            $sum: {
              $cond: [{ $eq: ["$_id.difficulty", "medium"] }, "$count", 0],
            },
          },
          hard: {
            $sum: {
              $cond: [{ $eq: ["$_id.difficulty", "hard"] }, "$count", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          topic: "$_id",
          count: 1,
          easy: 1,
          medium: 1,
          hard: 1,
        },
      },
    ]);
    return results;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const topicStats = async (subject, topic) => {
  const results = await QuestionCollection.find(
    { subject: subject, topic: topic },
    "-__v -_id",
  );
  results?.sort((a, b) => {
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
  return results;
};

const test = async () => {
  try {
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { test, dataBaseStats, subjectStats, topicStats };
