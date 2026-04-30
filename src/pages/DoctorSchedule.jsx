import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import EditScheduleModal from '../components/EditScheduleModal'; // අලුත් Modal එක

function DoctorSchedule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Edit Modal එකට අදාළ States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // 1. Stats Area
  const stats = [
    { label: "Total Doctors", value: "24", iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "blue" },
    { label: "On Duty Today", value: "18", iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
    { label: "On Leave", value: "03", iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", color: "rose" },
  ];

  // 2. Mock Data for Roster
  const rosterData = Array.from({ length: 12 }, (_, i) => ({
    id: `DOC-00${i + 1}`,
    name: i === 0 ? "Dr. Sarah Johnson" : i === 1 ? "Dr. Michael Lee" : `Dr. Specialist ${i + 1}`,
    specialty: i % 3 === 0 ? "Cardiology" : i % 2 === 0 ? "Neurology" : "Pediatrics",
    days: i % 2 === 0 ? "Mon, Wed, Fri" : "Tue, Thu, Sat",
    shift: i % 2 === 0 ? "09:00 AM - 01:00 PM" : "04:00 PM - 08:00 PM",
    status: i % 5 === 0 ? "On Leave" : i % 3 === 0 ? "In Consultation" : "Available",
    imageUrl: `https://i.pravatar.cc/150?u=${i}`
  }));

  // 3. Search Logic
  const filteredDoctors = rosterData.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 4. Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Edit Button එක Click කරාම වෙන දේ
  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Doctor Schedules</h1>
          <p className="text-slate-500 font-medium mt-1">Manage weekly rosters and real-time doctor availability.</p>
        </div>
        <button className="bg-white text-blue-600 font-bold px-6 py-3.5 rounded-2xl border border-blue-100 shadow-sm hover:bg-blue-50 transition-all text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Export Weekly Roster
        </button>
      </div>

      {/* Stats Cards (Component එක හරියටම Map කරලා තියෙනවා) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((s, idx) => (
          <StatCard 
            key={idx} 
            label={s.label}
            value={s.value}
            iconPath={s.iconPath}
            color={s.color}
          />
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-8 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <input 
            type="text" 
            placeholder="Search by Doctor name or Specialty..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-sm"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Doctor</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Working Days</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Shift Time</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Current Status</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={doc.imageUrl} alt={doc.name} className="w-11 h-11 rounded-xl object-cover border-2 border-white shadow-sm" />
                      <div>
                        <p className="font-bold text-slate-800">{doc.name}</p>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{doc.specialty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-600 font-semibold text-sm">{doc.days}</td>
                  <td className="px-8 py-5 text-slate-800 font-bold text-sm">{doc.shift}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest border shadow-sm ${
                      doc.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      doc.status === 'On Leave' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleEditClick(doc)}
                      className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all"
                      title="Edit Schedule"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium hidden sm:block">
            Showing <span className="font-bold text-slate-800">{indexOfFirstItem + 1}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastItem, filteredDoctors.length)}</span> of <span className="font-bold text-slate-800">{filteredDoctors.length}</span> doctors
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

      {/* Render the Edit Modal */}
      <EditScheduleModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        doctor={selectedDoctor}
      />

    </div>
  );
}

export default DoctorSchedule;