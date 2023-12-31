const express = require("express");
const router = express.Router();

const {
  addQuestion,
  addMultipleQuestions,
  getAllQuestions,
  getQuestions,
} = require("../controller/Question");

const { getQuestionPaper } = require("../controller/QuestionPaper");

router.post("/addQuestion", addQuestion);
router.post("/addMultipleQuestions", addMultipleQuestions);
router.post("/getQuestions", getQuestions);
router.get("/", getAllQuestions);

router.post("/getQuestionPaper", getQuestionPaper);

module.exports = router;
