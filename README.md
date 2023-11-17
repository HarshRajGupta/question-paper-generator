# Question Paper Generator Backend Readme

## Overview

This repository contains the backend for a Question Paper Generator implemented in Node.js. The system allows users to manage and retrieve questions based on various criteria such as subject, topic, and difficulty. Additionally, it provides endpoints for adding single or multiple questions and generating question papers.

## NOTE 

- All questions of same difficulty are considered to be of equal weighage provided subjects are same.
- Sample Data is provided in `data.json` file, to monitor its statics use `Stats Routes`
- Live Site Link: [`https://question-paper-generator-13iy.onrender.com`](https://question-paper-generator-13iy.onrender.com)

## Setup

To run the application, follow these steps:

1. Clone the repository to your local machine.

```bash
git clone https://github.com/HarshRajGupta/question-paper-generator.git
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/cafc26ac-f6ef-495d-9c6d-35eeafb54913)

2. Navigate to the project directory.

```bash
cd question-paper-generator
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/f97103f1-e23b-495a-96ea-f0586632a008)

3. Install dependencies using npm.

```bash
npm install
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/db5a9da8-0149-470e-b5d6-59ae77a23fb1)

4. Create a `.env` file in the root directory and add your MongoDB connection URL in the following format. You can use the provided `.env.sample` as a template.

```env
MONGO_URL=mongodb://your-mongo-db-url
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/34a600e5-a1f0-4bef-9c13-98ddff18c5c0)

5. Start the application.

```bash
npm start
```
![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/ab86f97a-37eb-40cc-afa2-5a8515acee9b)

The server will be running on [`http://localhost:4000`](http://localhost:4000) by default.

## Endpoints

### 1. Stats Routes

1. ##### `/`
   - Method: GET
   - Description: Get statistics of the entire database.
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/c0b5b639-dadf-40ce-b2fb-e170a1fb60a2)

2. ##### `/:subject`

   - Method: GET
   - Description: Get statistics of a specific subject in the database.
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/e5cad74e-e459-419c-9c16-5b4bbd18a9df)

3. ##### `/:subject/:topic`

   - Method: GET
   - Description: Get statistics of a specific subject and topic in the database.
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/b77ed2bd-c348-4932-9412-122853af5669)

### 2. Question Routes

1. ##### `/api`

   - Method: GET
   - Description: Get all questions in the database.
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/e5dfe93f-93ef-4b49-b578-c7d2dfa36028)

2. ##### `/api/getQuestions`

   - Method: POST
   - Description: Get questions based on specified criteria.
   - Fields:
      - subject (optional)
      - topic (optional)
      - difficulty (optional)
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/b90cf4fd-0e0c-4dec-a76c-0ceee92caa96)

3. ##### `/api/addQuestion`

   - Method: POST
   - Description: Add a single question to the database.
   - Fields:
      - question
      - subject
      - topic
      - difficulty (easy, medium, or hard)
      - marks
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/3aad13e5-3749-40f0-bb98-6e709c2b5f6c)

4. ##### `/api/addMultipleQuestions`

   - Method: POST
   - Description: Add multiple questions to the database.
   - Input: `questions` (Array of question objects).
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/0836b589-20c2-4b66-b0b1-d8b1e7461b16)

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
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/6ae7dc0d-5a18-46db-8583-a9080c98a804)
   - NOTE: Make sure to provide marks if `easy`, `medium`, and `hard` are fractions or percentages. Otherwise, they will be considered as the total weighage.
   - ![image](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/8be12783-5299-409b-9315-70ffa82aa075)
