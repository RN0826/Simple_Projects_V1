const DB_KEY = "helios_sms_demo_v1";
const SESSION_KEY = "helios_sms_current_user";
const THEME_KEY = "helios_sms_theme";

const defaultStudentPassword = "student123";

// Generates record IDs, falling back when crypto.randomUUID is unavailable.
function createId() {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Default demo data used on first load and when resetting the app.
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
      id: createId(),
      studentId: "001",
      date: "2026-05-17",
      status: "Present",
      notes: "Seed record",
    },
  ],
};

// Reads the database from localStorage, or initializes it with seed data if not present or corrupted
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

// Writes the entire database back to localStorage and dispatches an event to notify listeners of changes
function writeDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  window.dispatchEvent(new Event("helios-storage"));
}

// Reads the saved theme, defaulting to light.
export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

// Saves the selected theme.
export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

// Returns the currently logged-in user from localStorage.
export function getCurrentUser() {
  const saved = localStorage.getItem(SESSION_KEY);
  return saved ? JSON.parse(saved) : null;
}

// Clears the current login session.
export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

// Authentication function that checks credentials against hardcoded admin and student records, sets session if valid, and returns appropriate messages
export function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === "admin@helios.edu" && password === "admin123") {
    const user = {
      role: "admin",
      email: normalizedEmail,
      name: "Helios Admin",
    };
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

// Retrieves a student record by ID, returns undefined if not found
export function getStudentById(studentId) {
  return readDb().students.find((student) => student.id === studentId);
}

export function addStudent(student) {
  const db = readDb();
  const id = student.id.trim();
  const email = student.email.trim();

  // Basic validation for required fields and uniqueness
  if (!id || !student.name.trim() || !email) {
    return { ok: false, message: "Student ID, name, and email are required." };
  }

  // Check for duplicate ID or email
  if (db.students.some((entry) => entry.id === id)) {
    return { ok: false, message: "A student with this ID already exists." };
  }

  // Keep email matching case-insensitive so the same email cannot be reused with different casing.
  if (
    db.students.some(
      (entry) => entry.email.toLowerCase() === email.toLowerCase(),
    )
  ) {
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
  // Return success status without exposing the new student data, as the caller can retrieve it via getStudents() if needed
  return { ok: true };
}

// Updates an existing student record by merging provided updates with the existing data, returns status and message if student not found
export function updateStudent(studentId, updates) {
  const db = readDb();
  const index = db.students.findIndex((student) => student.id === studentId);
  if (index === -1) return { ok: false, message: "Student not found." };

  db.students[index] = { ...db.students[index], ...updates };
  writeDb(db);
  return { ok: true };
}

// Deletes a student record and all associated attendance records by student ID, then writes the updated database back to localStorage
export function deleteStudent(studentId) {
  const db = readDb();
  db.students = db.students.filter((student) => student.id !== studentId);
  db.attendance = db.attendance.filter(
    (record) => record.studentId !== studentId,
  );
  writeDb(db);
}

// Saves an attendance record by either updating an existing record for the same student and date or adding a new record to the beginning of the attendance array, then writes the updated database back to localStorage and returns status indicating whether it was an update or a new record
export function saveAttendance(record) {
  const db = readDb();
  const existingIndex = db.attendance.findIndex(
    (entry) =>
      entry.studentId === record.studentId && entry.date === record.date,
  );

  // Normalize the record to ensure consistent formatting and required fields
  const normalized = {
    id: existingIndex >= 0 ? db.attendance[existingIndex].id : createId(),
    studentId: record.studentId,
    date: record.date,
    status: record.status,
    notes: record.notes?.trim() || "",
  };

  // Update existing record if found, otherwise add new record to the beginning of the attendance array
  if (existingIndex >= 0) {
    db.attendance[existingIndex] = normalized;
  } else {
    db.attendance.unshift(normalized);
  }

  writeDb(db);
  return { ok: true, updated: existingIndex >= 0 };
}

// Retrieves all attendance records for a specific student by filtering the attendance array based on the provided student ID, returns an empty array if no records are found
export function getStudentAttendance(studentId) {
  return readDb().attendance.filter((record) => record.studentId === studentId);
}

// Resets the database to the initial seed data by overwriting the localStorage entry and dispatching an event to notify listeners of the change
export function resetDemoData() {
  localStorage.setItem(DB_KEY, JSON.stringify(seedData));
  window.dispatchEvent(new Event("helios-storage"));
}

export { defaultStudentPassword };
