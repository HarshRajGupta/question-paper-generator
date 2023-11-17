const express = require("express");
const connectDB = require("./database")
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/index"));

const port = process.env.PORT || 4000;

app.get("/", (req, res) =>
    res.send(`Server listening on <a href="http://localhost:${port}">http://localhost:${port} </a>`)
)

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`DEBUG: Server listening on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();