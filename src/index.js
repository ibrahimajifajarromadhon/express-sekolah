const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", async (req, res) => {
    const students = await prisma.students.findMany();

    res.send(students);
});

const studentsController = require('./student/student.controller');

app.use('/students', studentsController);

app.listen(PORT, () => {
    console.log("server running in PORT : " + PORT )
});