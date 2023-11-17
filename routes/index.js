const express = require('express');
const router = express.Router();

const {
    addQuestion,
    getAllQuestions,
    getQuestions
} = require('../controller/Question');

const {
    getQuestionPaper
} = require('../controller/QuestionPaper');

router.post('/addQuestion', addQuestion);
router.get('/getAllQuestions', getAllQuestions);
router.post('/getQuestions', getQuestions);

router.post('/getQuestionPaper', getQuestionPaper);

module.exports = router;