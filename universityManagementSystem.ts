// Enums
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled",
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special",
}

enum Semester {
    First = "First",
    Second = "Second",
}

enum GradeValue {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2,
}

enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering",
}

// Interfaces
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeValue;
    date: Date;
    semester: Semester;
}

// University Management System
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private studentIdCounter = 1;
    private courseIdCounter = 1;

    // Add a new student
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.studentIdCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }

    // Register a student for a course
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student) throw new Error("Student not found");
        if (!course) throw new Error("Course not found");

        if (course.faculty !== student.faculty) {
            throw new Error("Student's faculty does not match course faculty");
        }

        const registeredStudents = this.grades.filter(g => g.courseId === courseId).length;
        if (registeredStudents >= course.maxStudents) {
            throw new Error("Course is already full");
        }

        // Register the student by creating a "placeholder" grade record
        this.grades.push({ studentId, courseId, grade: null as any, date: new Date(), semester: course.semester });
    }

    // Assign a grade
    setGrade(studentId: number, courseId: number, grade: GradeValue): void {
        const registration = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);
        if (!registration) throw new Error("Student is not registered for this course");

        registration.grade = grade;
        registration.date = new Date();
    }

    // Update student status
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) throw new Error("Student not found");

        if (student.status === StudentStatus.Graduated || student.status === StudentStatus.Expelled) {
            throw new Error("Cannot change status of graduated or expelled student");
        }

        student.status = newStatus;
    }

    // Get students by faculty
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Get grades of a student
    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Get available courses by faculty and semester
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Calculate average grade of a student
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.grades.filter(g => g.studentId === studentId && g.grade !== null);
        if (studentGrades.length === 0) return 0;

        const total = studentGrades.reduce((sum, g) => sum + g.grade!, 0);
        return total / studentGrades.length;
    }

    // Get top students by faculty
    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        const studentsByFaculty = this.students.filter(s => s.faculty === faculty);
        const topStudents: Student[] = [];

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
