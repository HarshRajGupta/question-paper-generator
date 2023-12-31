# Question Paper Generator

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
![git clone https://github.com/HarshRajGupta/question-paper-generator.git](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/827bebbd-d454-44fb-b1ab-3974e517d36f)

2. Navigate to the project directory.

```bash
cd question-paper-generator
```
![cd question-paper-generator](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/09b0e54c-ceec-43bc-9065-a66cd6683871)


3. Install dependencies using npm.

```bash
npm install
```
![npm install](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/9082d314-825b-4df0-95f3-f7b21b92ea32)

4. Create a `.env` file in the root directory and add your MongoDB connection URL in the following format. You can use the provided `.env.sample` as a template.

```env
MONGO_URL=mongodb://your-mongo-db-url
```
![MONGO_URL=mongodb://your-mongo-db-url](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/c6cbd315-a5a4-42ce-a061-7a71202858ba)


5. Start the application.

```bash
npm start
```
![npm start](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/cf4330be-321e-4fe4-ae24-2983a9379c1b)


The server will be running on [`http://localhost:4000`](http://localhost:4000) by default.

## Endpoints

### 1. Stats Routes

1. ##### `/`

   - Method: GET
   - Description: Get statistics of the entire database.
   - ![`/`](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/aaf41a93-32e6-4648-8c55-2194618e2752)

2. ##### `/:subject`

   - Method: GET
   - Description: Get statistics of a specific subject in the database.
   - ![`/:subject`](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/341cdffd-4f0a-40d5-9789-99dc7b57382c)


3. ##### `/:subject/:topic`

   - Method: GET
   - Description: Get statistics of a specific subject and topic in the database.
   - ![`/:subject/:topic`](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/e44be671-c9fc-453e-8fb1-f345113613be)


### 2. Question Routes

1. ##### `/api`

   - Method: GET
   - Description: Get all questions in the database.
   - ![`/api`](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/cd9940c5-87a4-4b3b-8971-9b9994a2326b)


2. ##### `/api/getQuestions`

   - Method: POST
   - Description: Get questions based on specified criteria.
   - Fields:
     - subject (optional)
     - topic (optional)
     - difficulty (optional)
   - ![`/api/getQuestions`](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/300d99ea-5816-4d26-a036-53365e4bddaa)



3. ##### `/api/addQuestion`

   - Method: POST
   - Description: Add a single question to the database.
   - Fields:
     - question
     - subject
     - topic
     - difficulty (easy, medium, or hard)
     - marks
   - ![`/api/addQuestion`](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/78779762-bac7-443c-892f-b7fece13ee8a)


4. ##### `/api/addMultipleQuestions`

   - Method: POST
   - Description: Add multiple questions to the database.
   - Input: `questions` (Array of question objects).
   - ![`/api/addMultipleQuestions`](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/96e8ae2c-ebf8-4016-ab5f-65a07edc0e5e)


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
   - ![`/api/getQuestionPaper`](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/af59d04d-100c-4d11-8f5c-f0afc6e288f2)
   - NOTE: Make sure to provide marks if `easy`, `medium`, and `hard` are fractions or percentages. Otherwise, they will be considered as the total weighage.
   - ![`/api/getQuestionPaper`](https://github.com/HarshRajGupta/question-paper-generator/assets/85221003/90c7b812-263e-4b9b-ab32-df36cccfd7d6)

