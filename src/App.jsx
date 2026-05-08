import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ReceptionDashboard from './pages/ReceptionDashboard';
import StaffLayout from './components/StaffLayout';
import PatientsDirectory from './pages/PatientsDirectory';
import AppointmentsManagement from './pages/AppointmentsManagement';
import BillingPage from './pages/BillingPage';
import DoctorSchedule from './pages/DoctorSchedule';
import DoctorDashboard from './pages/DoctorDashboard';
import ActiveConsultation from './pages/ActiveConsultation';
import ConsultationHistory from './pages/ConsultationHistory';
import SettingsPage from './pages/SettingsPage';
import AdminDashboard from './pages/AdminDashboard';
import StaffDirectory from './pages/StaffDirectory';
import FinancialReports from './pages/FinancialReports';
import TodayAppointments from './pages/TodayAppointments';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />


        <Route
          path="/reception/*"
          element={
            <StaffLayout>
              <ReceptionDashboard />
            </StaffLayout>
          }
        />
        <Route
          path="/reception/patients"
          element={
            <StaffLayout>
              <PatientsDirectory />
            </StaffLayout>
          }
        />
        <Route
          path="/reception/appointmentsManagement"
          element={
            <StaffLayout>
              <AppointmentsManagement />
            </StaffLayout>
          }
        />

        <Route
          path="/reception/schedules"
          element={
            <StaffLayout>
              <DoctorSchedule />
            </StaffLayout>
          }
        />

        <Route
          path="/reception/billingPage"
          element={
            <StaffLayout>
              <BillingPage />
            </StaffLayout>
          }
        />

        <Route
          path="/doctor/*"
          element={
            <StaffLayout>
              <DoctorDashboard />
            </StaffLayout>
          }
        />

        {/* <Route path="/doctor/consultation/:patientId" element={<StaffLayout><ActiveConsultation /></StaffLayout>} /> */}
        <Route path="/doctor/consultation" element={<StaffLayout><ActiveConsultation /></StaffLayout>} />
        <Route path="/doctor/consultations" element={<StaffLayout><ConsultationHistory /></StaffLayout>} />
        <Route path="/reception/settings" element={<StaffLayout><SettingsPage /></StaffLayout>} />
        <Route path="/doctor/settings" element={<StaffLayout><SettingsPage /></StaffLayout>} />
        <Route path="/doctor/todayAppoinments" element={<StaffLayout><TodayAppointments /></StaffLayout>} />

        <Route path="/admin" element={<StaffLayout><AdminDashboard /></StaffLayout>} />
        <Route path="/admin/staff" element={<StaffLayout><StaffDirectory /></StaffLayout>} />
        <Route path="/admin/reports" element={<StaffLayout><FinancialReports /></StaffLayout>} />
        <Route path="/admin/settings" element={<StaffLayout><SettingsPage /></StaffLayout>} />




        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;