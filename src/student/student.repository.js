// Berkumunkasi dengan database
// Boleh pake ORM, boleh raw query
// Supaya apa? Supaya kalau mau ganti-ganti ORM tinggal edit file ini aja

const prisma = require("../db");

const findStudents = async () => {
    const students = prisma.students.findMany();
    
    return students;
};

const findStudentById = async (id) => {
    const student = await prisma.students.findUnique({
        where: {
            id,
        },
    });

    return student;
};

const findStudentByNim = async (nim) => {
    const student = await prisma.students.findFirst({
        where: {
            nim,
        },
    });

    return student;
};

const insertStudent = async (newStudentData) => {
    const students = await prisma.students.create({
        data: {
            nim: newStudentData.nim,
            nama: newStudentData.nama,
            alamat: newStudentData.alamat,
            image: newStudentData.image,
        },
    });

    return students;
};

const deleteStudent = async (id) => {
    await prisma.students.delete({
        where: {
            id,
        },
    });
};

const updateStudent = async (id, studentData) => {
    const student = await prisma.students.update({
        where: {
            id: parseInt(id),
        },
        data: {
            nim: studentData.nim,
            nama: studentData.nama,
            alamat: studentData.alamat,
            image: studentData.image,
        },
    });
    return student;
}

module.exports = { findStudents, findStudentById, insertStudent, findStudentByNim, deleteStudent, updateStudent }