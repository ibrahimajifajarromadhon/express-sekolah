// Controller layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require('express');
const prisma = require('../db');
const { getAllStudents, getStudentById, createStudent, deleteStudentById, updateStudentById } = require('./student.service');

const router = express.Router();

router.get("/", async (req, res) => {
    const students = await getAllStudents();

    res.send(students);
});

router.get("/:id", async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        const student = await getStudentById(studentId);
        
        res.send(student);
    } catch (err) {
        res.status(400).send(err.message);
    }

});

router.post("/", async (req, res) => {
    try {
        const newStudentData = req.body;

        const students = await createStudent(newStudentData);

        res.status(200).send({
            data: students,
            message: "create student success"
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});

router.put("/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentData = req.body;

        if (!(studentData.nim && studentData.nama && studentData.alamat && studentData.image)){
            return res.status(400).send("Some fields are missing");
        }

        const student = await updateStudentById(parseInt(studentId), studentData);

        res.send({
            data: student,
            message: "update student success"
        });
    } catch (err) {
        res.status(400).send(err.message);
    }

});

router.patch("/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const studentData = req.body;

        const student = await updateStudentById(parseInt(studentId), studentData);

        res.send({
            data: student,
            message: "update student success"
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});

router.delete("/:id", async (req, res) => {
    try {
        const studentId = req.params.id;

        await deleteStudentById(parseInt(studentId));

        res.status(200).send("delete student success");
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});

module.exports = router;