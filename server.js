const express = require("express");
const connectDB = require("./database/connectDB");
const createDB = require("./database/createDB");
const { test, dataBaseStats, subjectStats, topicStats } = require("./test");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.use("/api", require("./routes/index"));

app.get("/", async (req, res) => res.send(await dataBaseStats()));

app.get("/:subject", async (req, res) => {
  const subject = req.params.subject;
  const results = await subjectStats(subject);
  res.send(results);
});

app.get("/:subject/:topic", async (req, res) => {
  const subject = req.params.subject;
  const topic = req.params.topic;
  const results = await topicStats(subject, topic);
  res.send(results);
});

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`DEBUG: Server listening on http://localhost:${port}`);
    });
    await createDB();
  } catch (error) {
    console.log(error);
  }
};

start();
