// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate dan functionnya reusable

const prisma = require("../db");
const { findStudents, findStudentById, insertStudent, findStudentByNim, deleteStudent, updateStudent } = require("./student.repository");

const getAllStudents = async () => {
    const students = await findStudents();
    
    return students;
};

const getStudentById = async (id) => {
    if(typeof id !== "number"){
        throw Error("Id is not a number");
    }

    const student = await findStudentById(id);

    if(!student){
        throw Error("Student not found");
    }

    return student;
};

const createStudent = async (newStudentData) => {
    const findStudent = await findStudentByNim(newStudentData.nim)

    if(findStudent){
        throw new Error("NIM has to be unique");
    }
    const students = await insertStudent(newStudentData);

    return students;
};

const deleteStudentById = async (id) => {
    await getStudentById(id);

    await deleteStudent(id);
};

const updateStudentById = async (id, studentData) => {
    await getStudentById(id);

    const student = await updateStudent(id, studentData);

    return student;
} 

module.exports = { getAllStudents, getStudentById, createStudent, deleteStudentById, updateStudentById }