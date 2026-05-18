import { Save } from "lucide-react";
import { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { getAttendance, getStudents, saveAttendance } from "../data/storage.js";

const today = new Date().toISOString().slice(0, 10);

export default function Attendance() {
  const [students, setStudents] = useState(getStudents);
  const [attendance, setAttendance] = useState(getAttendance);
  const [studentId, setStudentId] = useState(students[0]?.id || "");
  const [date, setDate] = useState(today);
  const [status, setStatus] = useState("Present");
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  const rows = useMemo(() => {
    return attendance
      .filter((record) => filter === "All" || record.status === filter)
      .map((record) => ({
        ...record,
        student: students.find((student) => student.id === record.studentId),
      }));
  }, [attendance, filter, students]);

  function refresh() {
    setStudents(getStudents());
    setAttendance(getAttendance());
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = saveAttendance({ studentId, date, status, notes });
    setMessage(result.updated ? "Existing attendance updated." : "Attendance saved.");
    setNotes("");
    refresh();
  }

  return (
    <DashboardLayout
      eyebrow="Admin Portal"
      title="Attendance"
      description="Mark daily attendance and review previous records."
    >
      <section className="panel">
        <h3>Mark Attendance</h3>
        <form className="attendance-form" onSubmit={handleSubmit}>
          <select value={studentId} onChange={(event) => setStudentId(event.target.value)} required>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
            <option>Excused</option>
          </select>
          <input
            placeholder="Optional note"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <button className="button button-primary" type="submit">
            <Save size={20} />
            Save
          </button>
        </form>
        {message ? <p className="form-note">{message}</p> : null}
      </section>

      <section className="panel panel-flush">
        <div className="panel-header">
          <h3>Attendance History</h3>
          <select className="compact-select" value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option>All</option>
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
            <option>Excused</option>
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((record) => (
                <tr key={record.id}>
                  <td>{record.studentId}</td>
                  <td>{record.student?.name || "Unknown"}</td>
                  <td>{record.student?.department || "-"}</td>
                  <td>{record.date}</td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td>{record.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}
