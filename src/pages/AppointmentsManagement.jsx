import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard';
import NewAppointmentModal from '../components/NewAppointmentModal';

function AppointmentsManagement() {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const [selectedDoctor, setSelectedDoctor] = useState('All Doctors');
  const [selectedDate, setSelectedDate] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const appointmentsPerPage = 5;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('staffToken');
        const headers = { Authorization: `Bearer ${token}` };

        const [appointmentsRes, summaryRes] = await Promise.all([
          axios.get('http://localhost:8080/api/reception/appointments/all', { headers }),
          axios.get('http://localhost:8080/api/reception/appointments/summary', { headers })
        ]);

        setAppointments(appointmentsRes.data);
        setSummary(summaryRes.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const uniqueDoctors = ['All Doctors', ...new Set(appointments.map(apt => apt.doctorName).filter(Boolean))];

 
  const sortedAppointments = [...appointments].sort((a, b) => b.id - a.id);

  // 2. Filtering (Search + Doctor + Date)
  const filteredAppointments = sortedAppointments.filter(apt => {
    
    const matchesSearch = 
      (apt.patientName && apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (apt.appointmentId && apt.appointmentId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (apt.doctorName && apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()));

  
    const matchesDoctor = selectedDoctor === 'All Doctors' || apt.doctorName === selectedDoctor;

    
    const matchesDate = selectedDate === '' || (apt.appointmentDate && apt.appointmentDate.includes(selectedDate));

    return matchesSearch && matchesDoctor && matchesDate;
  });

  // 3. Pagination Logic
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

      {/* Quick Stats Area */}
      {!isLoading && summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Total Bookings" 
            value={summary.totalAppointments} 
            bgColorClass="bg-blue-50" colorClass="text-blue-600"
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
          />
          <StatCard 
            title="Pending" 
            value={summary.pendingAppointments} 
            bgColorClass="bg-amber-50" colorClass="text-amber-600"
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          />
          <StatCard 
            title="Confirmed" 
            value={summary.confirmedAppointments} 
            bgColorClass="bg-emerald-50" colorClass="text-emerald-600"
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          />
          <StatCard 
            title="Canceled" 
            value={summary.cancelledAppointments} 
            bgColorClass="bg-rose-50" colorClass="text-rose-600"
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          />
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-8 flex flex-wrap items-center gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <input 
            type="text" 
            placeholder="Search patient, ID, or doctor..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-sm"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        {/* Doctor Filter Dropdown */}
        <select 
          value={selectedDoctor}
          onChange={(e) => {
            setSelectedDoctor(e.target.value);
            setCurrentPage(1);
          }}
          className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-600 text-sm outline-none focus:border-blue-500 cursor-pointer"
        >
          {uniqueDoctors.map((docName, index) => (
            <option key={index} value={docName}>{docName}</option>
          ))}
        </select>

        {/* Date Filter Input */}
        <div className="relative flex items-center">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setCurrentPage(1);
            }}
            className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-600 text-sm outline-none focus:border-blue-500" 
          />
          
          {selectedDate && (
             <button onClick={() => { setSelectedDate(''); setCurrentPage(1); }} className="absolute right-3 text-slate-400 hover:text-rose-500">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
          )}
        </div>

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
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-slate-400 font-bold">Loading Appointments...</td>
                </tr>
              ) : currentAppointments.length > 0 ? (
                currentAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-800">{apt.patientName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{apt.appointmentId} • {apt.reasonForVisit}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-700 text-sm">{apt.doctorName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{apt.doctorSpecialty}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-800">{apt.appointmentDate}</p>
                      <p className="text-xs font-bold text-blue-600 mt-0.5">{apt.appointmentTime}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest border shadow-sm ${
                        apt.status?.includes('COMPLETED') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        apt.status?.includes('SCHEDULED') ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        apt.status?.includes('CANCEL') ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {apt.status || 'PENDING'}
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

      <NewAppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => window.location.reload()} 
      />

    </div>
  );
}

export default AppointmentsManagement;