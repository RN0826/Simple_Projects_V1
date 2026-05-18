import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { getCurrentUser, getStudentAttendance } from "../data/storage.js";

export default function StudentAttendance() {
  const user = getCurrentUser();
  const records = getStudentAttendance(user.studentId);

  return (
    <DashboardLayout
      eyebrow="Student Portal"
      title="My Attendance"
      description="Review all attendance records saved for your account."
    >
      <section className="panel panel-flush">
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
              {records.map((record) => (
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
