import { CalendarCheck, ClipboardList, UsersRound } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatCard from "../components/StatCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { getAttendance, getStudents, resetDemoData } from "../data/storage.js";

export default function AdminDashboard() {
  const students = getStudents();
  const attendance = getAttendance();
  const recent = attendance.slice(0, 5);

  return (
    <DashboardLayout
      eyebrow="Admin Portal"
      title="Admin Dashboard"
      description="Overview of students, attendance records, and recent activity."
    >
      <section className="stats-grid">
        <StatCard label="Total Students" value={students.length} icon={UsersRound} />
        <StatCard label="Attendance Records" value={attendance.length} icon={CalendarCheck} />
        <StatCard label="System Status" value="Active" note="Local browser database" icon={ClipboardList} />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Recent Activity</h3>
          <button className="button button-soft" type="button" onClick={resetDemoData}>
            Reset Demo Data
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((record) => {
                const student = students.find((entry) => entry.id === record.studentId);
                return (
                  <tr key={record.id}>
                    <td>{student?.name || record.studentId}</td>
                    <td>{record.date}</td>
                    <td>
                      <StatusBadge status={record.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}
