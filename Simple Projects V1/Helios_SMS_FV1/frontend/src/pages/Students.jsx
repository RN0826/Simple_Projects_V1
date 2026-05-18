import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { addStudent, deleteStudent, getStudents, updateStudent } from "../data/storage.js";

const blankStudent = {
  id: "",
  name: "",
  email: "",
  phone: "",
  department: "",
  semester: "",
};

export default function Students() {
  const [students, setStudents] = useState(getStudents);
  const [form, setForm] = useState(blankStudent);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");

  function refresh() {
    setStudents(getStudents());
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = editingId ? updateStudent(editingId, form) : addStudent(form);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setMessage(editingId ? "Student updated." : "Student added. They can now login with student123.");
    setForm(blankStudent);
    setEditingId("");
    refresh();
  }

  function editStudent(student) {
    setEditingId(student.id);
    setForm(student);
    setMessage("");
  }

  function removeStudent(studentId) {
    deleteStudent(studentId);
    refresh();
  }

  return (
    <DashboardLayout
      eyebrow="Admin Portal"
      title="Student Management"
      description="Add, update, and maintain student records."
    >
      <section className="panel">
        <h3>{editingId ? "Edit Student" : "Add Student"}</h3>
        <form className="student-form" onSubmit={handleSubmit}>
          <input
            placeholder="Student ID"
            value={form.id}
            disabled={Boolean(editingId)}
            onChange={(event) => updateField("id", event.target.value)}
          />
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={(event) => updateField("department", event.target.value)}
          />
          <input
            placeholder="Semester"
            value={form.semester}
            onChange={(event) => updateField("semester", event.target.value)}
          />
          <div className="form-actions">
            <button className="button button-primary" type="submit">
              {editingId ? <Pencil size={20} /> : <Plus size={20} />}
              {editingId ? "Update Student" : "Add Student"}
            </button>
            {editingId ? (
              <button
                className="button button-soft"
                type="button"
                onClick={() => {
                  setEditingId("");
                  setForm(blankStudent);
                }}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
        {message ? <p className="form-note">{message}</p> : null}
      </section>

      <section className="panel panel-flush">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>
                  <td>{student.semester}</td>
                  <td>
                    <div className="icon-actions">
                      <button type="button" onClick={() => editStudent(student)} aria-label="Edit student">
                        <Pencil size={18} />
                      </button>
                      <button type="button" onClick={() => removeStudent(student.id)} aria-label="Delete student">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}
