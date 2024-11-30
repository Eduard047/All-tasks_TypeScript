"use strict";
// Enums
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (GradeValue = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
// University Management System
class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        this.studentIdCounter = 1;
        this.courseIdCounter = 1;
    }
    // Add a new student
    enrollStudent(student) {
        const newStudent = Object.assign({ id: this.studentIdCounter++ }, student);
        this.students.push(newStudent);
        return newStudent;
    }
    // Register a student for a course
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student)
            throw new Error("Student not found");
        if (!course)
            throw new Error("Course not found");
        if (course.faculty !== student.faculty) {
            throw new Error("Student's faculty does not match course faculty");
        }
        const registeredStudents = this.grades.filter(g => g.courseId === courseId).length;
        if (registeredStudents >= course.maxStudents) {
            throw new Error("Course is already full");
        }
        // Register the student by creating a "placeholder" grade record
        this.grades.push({ studentId, courseId, grade: null, date: new Date(), semester: course.semester });
    }
    // Assign a grade
    setGrade(studentId, courseId, grade) {
        const registration = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);
        if (!registration)
            throw new Error("Student is not registered for this course");
        registration.grade = grade;
        registration.date = new Date();
    }
    // Update student status
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student)
            throw new Error("Student not found");
        if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) {
            throw new Error("Cannot change status of graduated or expelled student");
        }
        student.status = newStatus;
    }
    // Get students by faculty
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    // Get grades of a student
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    // Get available courses by faculty and semester
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }
    // Calculate average grade of a student
    calculateAverageGrade(studentId) {
        const studentGrades = this.grades.filter(g => g.studentId === studentId && g.grade !== null);
        if (studentGrades.length === 0)
            return 0;
        const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return total / studentGrades.length;
    }
    // Get top students by faculty
    getTopStudentsByFaculty(faculty) {
        const studentsByFaculty = this.students.filter(s => s.faculty === faculty);
        const topStudents = [];
        for (const student of studentsByFaculty) {
            const avgGrade = this.calculateAverageGrade(student.id);
            if (avgGrade >= 4.5) {
                topStudents.push(student);
            }
        }
        return topStudents;
    }
}
// Example usage
const ums = new UniversityManagementSystem();
// Add a new student
const student = ums.enrollStudent({
    fullName: "John Doe",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date("2023-09-01"),
    groupNumber: "CS-101",
});
// Add a course
ums["courses"].push({
    id: 1,
    name: "Algorithms",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30,
});
// Register for the course
ums.registerForCourse(student.id, 1);
// Assign a grade
ums.setGrade(student.id, 1, GradeValue.Excellent);
console.log(ums.getStudentGrades(student.id));
console.log(ums.calculateAverageGrade(student.id));
