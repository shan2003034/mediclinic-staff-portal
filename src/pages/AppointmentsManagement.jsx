import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import NewAppointmentModal from '../components/NewAppointmentModal';

function AppointmentsManagement() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // 1. Stats Array (Map කරලා StatCard එකට යවන්න)
  const stats = [
    { label: "Total Bookings", value: "124", iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "blue" },
    { label: "Pending", value: "18", iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
    { label: "Completed", value: "98", iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
    { label: "Canceled", value: "08", iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", color: "rose" },
  ];

  // 2. Mock Data (Pagination පෙන්වන්න 15ක් හදලා තියෙනවා)
  const allAppointments = Array.from({ length: 15 }, (_, i) => ({
    id: `APT-${2045 + i}`,
    patient: i === 0 ? "Shan Gajanayake" : i === 1 ? "Kasun Perera" : `Patient Name ${i + 1}`,
    doctor: i % 2 === 0 ? "Dr. Sarah Johnson" : "Dr. Michael Lee",
    specialty: i % 2 === 0 ? "Cardiology" : "Neurology",
    date: `2026-04-${27 + (i % 3)}`,
    time: `10:${i < 10 ? '0' + i : i} AM`,
    status: i % 4 === 0 ? "Confirmed" : i % 3 === 0 ? "Checked In" : i % 5 === 0 ? "Canceled" : "Pending",
    type: i % 2 === 0 ? "Consultation" : "Follow-up"
  }));

  // 3. Search Logic
  const filteredAppointments = allAppointments.filter(apt => 
    apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 4. Pagination Logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in relative">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Appointments</h1>
          <p className="text-slate-500 font-medium mt-1">View and manage all patient bookings and schedules.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transition-all text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Book New Appointment
        </button>
      </div>

      {/* Quick Stats Area (Reusable Component) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item, index) => (
          <StatCard 
            key={index}
            label={item.label}
            value={item.value}
            iconPath={item.iconPath}
            color={item.color}
          />
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-8 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <input 
            type="text" 
            placeholder="Search patient, ID, or doctor..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Search කරද්දී 1 වෙනි පිටුවට යනවා
            }}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-sm"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <select className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-600 text-sm outline-none focus:border-blue-500 cursor-pointer">
          <option>All Doctors</option>
          <option>Dr. Sarah Johnson</option>
          <option>Dr. Michael Lee</option>
        </select>
        <input type="date" className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-600 text-sm outline-none focus:border-blue-500" />
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">ID & Patient</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Doctor & Specialty</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentAppointments.length > 0 ? (
                currentAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-800">{apt.patient}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{apt.id} • {apt.type}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-700 text-sm">{apt.doctor}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{apt.specialty}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-800">{apt.date}</p>
                      <p className="text-xs font-bold text-blue-600 mt-0.5">{apt.time}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest border shadow-sm ${
                        apt.status === 'Checked In' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        apt.status === 'Canceled' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        apt.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Reschedule">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Cancel">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-slate-400 font-medium">No appointments found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium hidden sm:block">
            Showing <span className="font-bold text-slate-800">{indexOfFirstAppointment + 1}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastAppointment, filteredAppointments.length)}</span> of <span className="font-bold text-slate-800">{filteredAppointments.length}</span> appointments
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`p-2 rounded-xl transition-all flex items-center justify-center ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button key={index + 1} onClick={() => paginate(index + 1)} className={`w-10 h-10 rounded-xl font-bold transition-all text-sm flex items-center justify-center ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {index + 1}
                </button>
              ))}
            </div>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 rounded-xl transition-all flex items-center justify-center ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      )}

      {/* Modal Integration */}
      <NewAppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}

export default AppointmentsManagement;