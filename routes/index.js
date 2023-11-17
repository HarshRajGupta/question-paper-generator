const express = require('express');
const router = express.Router();

const {
    addQuestion,
    addMultipleQuestions,
    getAllQuestions,
    getQuestions
} = require('../controller/Question');

const {
    getQuestionPaper
} = require('../controller/QuestionPaper');

router.post('/addQuestion', addQuestion);
router.post('/addMultipleQuestions', addMultipleQuestions);
router.get('/getAllQuestions', getAllQuestions);
router.post('/getQuestions', getQuestions);

router.post('/getQuestionPaper', getQuestionPaper);

module.exports = router;