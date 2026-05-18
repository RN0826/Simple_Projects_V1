const DB_KEY = "helios_sms_demo_v1";
const SESSION_KEY = "helios_sms_current_user";
const THEME_KEY = "helios_sms_theme";

const defaultStudentPassword = "student123";

const seedData = {
  students: [
    {
      id: "001",
      name: "Nox Von Reinhafer",
      email: "nox_vr@gmail.com",
      phone: "9876543210",
      department: "CSE",
      semester: "4",
    },
  ],
  attendance: [
    {
      id: crypto.randomUUID(),
      studentId: "001",
      date: "2026-05-17",
      status: "Present",
      notes: "Seed record",
    },
  ],
};

function readDb() {
  const saved = localStorage.getItem(DB_KEY);
  if (!saved) {
    localStorage.setItem(DB_KEY, JSON.stringify(seedData));
    return structuredClone(seedData);
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(DB_KEY, JSON.stringify(seedData));
    return structuredClone(seedData);
  }
}

function writeDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  window.dispatchEvent(new Event("helios-storage"));
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function getCurrentUser() {
  const saved = localStorage.getItem(SESSION_KEY);
  return saved ? JSON.parse(saved) : null;
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === "admin@helios.edu" && password === "admin123") {
    const user = { role: "admin", email: normalizedEmail, name: "Helios Admin" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { ok: true, user };
  }

  const db = readDb();
  const student = db.students.find(
    (entry) => entry.email.toLowerCase() === normalizedEmail,
  );

  if (student && password === defaultStudentPassword) {
    const user = {
      role: "student",
      email: student.email,
      name: student.name,
      studentId: student.id,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { ok: true, user };
  }

  return {
    ok: false,
    message: `Use admin123 for admin or ${defaultStudentPassword} for students.`,
  };
}

export function getStudents() {
  return readDb().students;
}

export function getAttendance() {
  return readDb().attendance;
}

export function getStudentById(studentId) {
  return readDb().students.find((student) => student.id === studentId);
}

export function addStudent(student) {
  const db = readDb();
  const id = student.id.trim();
  const email = student.email.trim();

  if (!id || !student.name.trim() || !email) {
    return { ok: false, message: "Student ID, name, and email are required." };
  }

  if (db.students.some((entry) => entry.id === id)) {
    return { ok: false, message: "A student with this ID already exists." };
  }

  if (db.students.some((entry) => entry.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, message: "A student with this email already exists." };
  }

  db.students.push({
    id,
    name: student.name.trim(),
    email,
    phone: student.phone.trim(),
    department: student.department.trim(),
    semester: student.semester.trim(),
  });
  writeDb(db);
  return { ok: true };
}

export function updateStudent(studentId, updates) {
  const db = readDb();
  const index = db.students.findIndex((student) => student.id === studentId);
  if (index === -1) return { ok: false, message: "Student not found." };

  db.students[index] = { ...db.students[index], ...updates };
  writeDb(db);
  return { ok: true };
}

export function deleteStudent(studentId) {
  const db = readDb();
  db.students = db.students.filter((student) => student.id !== studentId);
  db.attendance = db.attendance.filter((record) => record.studentId !== studentId);
  writeDb(db);
}

export function saveAttendance(record) {
  const db = readDb();
  const existingIndex = db.attendance.findIndex(
    (entry) => entry.studentId === record.studentId && entry.date === record.date,
  );
  const normalized = {
    id: existingIndex >= 0 ? db.attendance[existingIndex].id : crypto.randomUUID(),
    studentId: record.studentId,
    date: record.date,
    status: record.status,
    notes: record.notes?.trim() || "",
  };

  if (existingIndex >= 0) {
    db.attendance[existingIndex] = normalized;
  } else {
    db.attendance.unshift(normalized);
  }

  writeDb(db);
  return { ok: true, updated: existingIndex >= 0 };
}

export function getStudentAttendance(studentId) {
  return readDb().attendance.filter((record) => record.studentId === studentId);
}

export function resetDemoData() {
  localStorage.setItem(DB_KEY, JSON.stringify(seedData));
  window.dispatchEvent(new Event("helios-storage"));
}

export { defaultStudentPassword };
