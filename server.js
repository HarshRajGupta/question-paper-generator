const express = require("express");
const connectDB = require("./database")
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/index"));

const port = process.env.PORT || 4000;

app.get("/", (req, res) =>
    res.send(`Server listening on <a href="${process.env.BACKEND_URL}">${process.env.BACKEND_URL}</a>`)
)

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`DEBUG: Server listening on ${process.env.BACKEND_URL}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();