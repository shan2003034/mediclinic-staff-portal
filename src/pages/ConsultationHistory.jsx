import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import ConsultationRecordOffcanvas from '../components/ConsultationRecordOffcanvas'; // 1. අලුත් Component එක Import කළා

function ConsultationHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 2. Offcanvas එක පාලනය කරන්න States හැදුවා
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Stats Area
  const stats = [
    { label: "Today's Consultations", value: "24", iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "blue" },
    { label: "Avg. Time per Patient", value: "12m", iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
    { label: "Total History", value: "1,450", iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", color: "amber" },
  ];

  // Mock Data (Consultation Notes ද ඇතුළත් කර ඇත)
  const historyData = Array.from({ length: 12 }, (_, i) => ({
    id: `CON-${5000 + i}`,
    patientName: i === 0 ? "Shan Gajanayake" : i === 1 ? "Kasun Perera" : `Patient ${i + 1}`,
    reason: i % 3 === 0 ? "Severe Headache" : i % 2 === 0 ? "Fever & Cold" : "Regular Checkup",
    notes: i % 3 === 0 ? "Patient reported severe migraines lasting for 3 days. Prescribed painkillers and advised bed rest." : null, // සමහර ඒවට Notes දැම්මා
    date: `2026-04-${27 - (i % 5)}`,
    time: `10:${15 + i} AM`,
    prescriptionId: `Rx-880${i}`,
    status: "Completed"
  }));

  // Search Logic
  const filteredHistory = historyData.filter(item => 
    item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in relative">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Consultation History</h1>
          <p className="text-slate-500 font-medium mt-1">Search and review past clinical records and prescriptions.</p>
        </div>
        <div className="flex items-center gap-3">
           <input 
              type="date" 
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 text-sm outline-none focus:border-blue-500 cursor-pointer" 
            />
        </div>
      </div>

      {/* Stats Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((s, idx) => (
          <StatCard key={idx} {...s} />
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-8">
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="Search by Patient Name, ID, or Symptom..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-sm"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Session ID & Patient</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Diagnosis / Reason</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Prescription</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentHistory.length > 0 ? (
                currentHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-800">{item.patientName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.id}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-semibold text-slate-600 text-sm">{item.reason}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <p className="text-xs font-bold text-slate-700">{item.prescriptionId}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-800">{item.date}</p>
                      <p className="text-[10px] font-bold text-blue-600 uppercase mt-0.5">{item.time}</p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      {/* 3. බොත්තම එබුවාම Record එක State එකට සේව් කරනවා */}
                      <button 
                        onClick={() => setSelectedRecord(item)}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
                      >
                        View Record
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-slate-400 font-medium">No records found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium hidden sm:block">
            Showing <span className="font-bold text-slate-800">{indexOfFirstItem + 1}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastItem, filteredHistory.length)}</span> of <span className="font-bold text-slate-800">{filteredHistory.length}</span> records
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

      {/* 4. අලුත් Offcanvas එක පිටුවේ යටින් Render කරනවා */}
      <ConsultationRecordOffcanvas 
        isOpen={!!selectedRecord} // Record එකක් තියෙනවා නම් True වෙනවා
        onClose={() => setSelectedRecord(null)} // Close කරද්දී Record එක Null කරනවා
        record={selectedRecord}
      />

    </div>
  );
}

export default ConsultationHistory;