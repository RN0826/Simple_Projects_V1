import { CalendarCheck, ClipboardCheck, Percent, UserRound } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatCard from "../components/StatCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { getCurrentUser, getStudentAttendance, getStudentById } from "../data/storage.js";

function attendancePercent(records) {
  if (!records.length) return "0%";
  const presentLike = records.filter((record) => ["Present", "Late"].includes(record.status)).length;
  return `${Math.round((presentLike / records.length) * 100)}%`;
}

export default function StudentDashboard() {
  const user = getCurrentUser();
  const student = getStudentById(user.studentId);
  const records = getStudentAttendance(user.studentId);
  const latest = records.slice(0, 4);

  return (
    <DashboardLayout
      eyebrow="Student Portal"
      title="Student Dashboard"
      description="Your profile and attendance snapshot."
    >
      <section className="profile-panel">
        <div className="avatar-mark">
          <UserRound size={36} />
        </div>
        <div>
          <h3>{student?.name}</h3>
          <p>{student?.email}</p>
        </div>
        <dl>
          <div>
            <dt>Department</dt>
            <dd>{student?.department}</dd>
          </div>
          <div>
            <dt>Semester</dt>
            <dd>{student?.semester}</dd>
          </div>
        </dl>
      </section>

      <section className="stats-grid">
        <StatCard label="Total Records" value={records.length} icon={ClipboardCheck} />
        <StatCard label="Attendance Rate" value={attendancePercent(records)} icon={Percent} />
        <StatCard label="Latest Status" value={latest[0]?.status || "None"} icon={CalendarCheck} />
      </section>

      <section className="panel">
        <h3>Recent Attendance</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {latest.map((record) => (
                <tr key={record.id}>
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
