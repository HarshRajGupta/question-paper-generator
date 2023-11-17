# Question Paper Generator Backend Readme

## Overview

This repository contains the backend for a Question Paper Generator implemented in Node.js. The system allows users to manage and retrieve questions based on various criteria such as subject, topic, and difficulty. Additionally, it provides endpoints for adding single or multiple questions and generating question papers.

## NOTE 

1. All questions of same difficulty are considered to be of equal weighage provided subjects are same.
2. Sample Data is provided in `data.json` file, to monitor its statics use `Stats Routes`

## Setup

To run the application, follow these steps:

1. Clone the repository to your local machine.

```bash
git clone https://github.com/HarshRajGupta/question-paper-generator.git
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/985a2ebb-1f57-4373-8206-27f5e6c2db28)

2. Navigate to the project directory.

```bash
cd question-paper-generator
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/6448b526-aa12-4a7f-b76f-99ecf4d295ec)

3. Install dependencies using npm.

```bash
npm install
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/ff8e1b7f-f84b-4c36-b933-7b4c3f149f10)

4. Create a `.env` file in the root directory and add your MongoDB connection URL in the following format. You can use the provided `.env.sample` as a template.

```env
MONGO_URL=mongodb://your-mongo-db-url
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/34a600e5-a1f0-4bef-9c13-98ddff18c5c0)

5. Start the application.

```bash
npm start
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/de18178f-1dbd-42f4-9fd1-415657477d49)

The server will be running on `http://localhost:4000` by default.

## Endpoints

### 1. Stats Routes

1. ##### `/`
   - Method: GET
   - Description: Get statistics of the entire database.
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/8ff8fd95-82db-4231-b6dd-ea3fc9346c1f)

2. ##### `/:subject`

   - Method: GET
   - Description: Get statistics of a specific subject in the database.
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/26247097-b31a-49f0-b482-d277af4849b3)

3. ##### `/:subject/:topic`

   - Method: GET
   - Description: Get statistics of a specific subject and topic in the database.
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/19254bb0-ee73-40b7-b145-cabd0b60f5ab)


### 2. Question Routes

1. ##### `/api`

   - Method: GET
   - Description: Get all questions in the database.

2. ##### `/api/getQuestions`

   - Method: POST
   - Description: Get questions based on specified criteria.
   - Fields:
      - subject (optional)
      - topic (optional)
      - difficulty (optional)

3. ##### `/api/addQuestion`

   - Method: POST
   - Description: Add a single question to the database.
   - Fields:
      - question
      - subject
      - topic
      - difficulty (easy, medium, or hard)
      - marks

4. ##### `/api/addMultipleQuestions`

   - Method: POST
   - Description: Add multiple questions to the database.
   - Input: Array of questions.

### 3. Question Paper Route

1. ##### `/api/getQuestionPaper`

   - Method: POST
   - Description: Generate a question paper based on specified criteria.
   - Fields:
      - subject
      - topic (optional)
      - easy (total weighage of easy questions)
      - medium (total weighage of medium questions)
      - hard (total weighage of hard questions)
      - marks (optional, provide if `easy`, `medium`, and `hard` are fractions or percentage)
   - NOTE: Make sure to provide marks if `easy`, `medium`, and `hard` are fractions or percentages. Otherwise, they will be considered as the total weighage.
