import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleCard from "../components/ScheduleCard";
import ApplyLeaveModal from "../components/ApplyLeaveModal";

function ScheduleAndLeaves() {
  const [schedules, setSchedules] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('staffToken');

      const headers = { Authorization: `Bearer ${token}` };

      
      const [scheduleRes, leavesRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/doctor-management/schedule/${userId}`, { headers }),
        axios.get(`http://localhost:8080/api/doctor-management/leaves/${userId}`, { headers })
      ]);

      setSchedules(scheduleRes.data);
      setLeaves(leavesRes.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 
  const getStatusBadge = (status) => {
    if (status === 'Approved') return <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-extrabold uppercase tracking-wider rounded-lg">Approved</span>;
    if (status === 'Rejected') return <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-extrabold uppercase tracking-wider rounded-lg">Rejected</span>;
    return <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-extrabold uppercase tracking-wider rounded-lg">Pending</span>;
  };

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in max-w-7xl mx-auto">
      
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Schedule & Leaves</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your weekly working hours and leave requests.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3.5 bg-slate-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-slate-800/20 hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            My Weekly Schedule
          </h2>
          
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-slate-400 font-bold">Loading schedule...</p>
            ) : schedules.length > 0 ? (
              schedules.map((sched, index) => (
                <ScheduleCard key={index} schedule={sched} />
              ))
            ) : (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                <p className="text-slate-500 font-medium">No schedule assigned yet.</p>
              </div>
            )}
          </div>
        </div>

        
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            Leave Request History
          </h2>

          <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Reason</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-400 font-bold">Loading leaves...</td></tr>
                  ) : leaves.length > 0 ? (
                    leaves.map((leave) => (
                      <tr key={leave.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-800 text-sm whitespace-nowrap">{leave.leaveDate}</td>
                        <td className="px-6 py-4 font-medium text-slate-600 text-sm">{leave.reason}</td>
                        <td className="px-6 py-4 text-right">{getStatusBadge(leave.status)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-400 font-medium">No leave requests found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

     
      <ApplyLeaveModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLeaveApplied={fetchData} 
      />

    </div>
  );
}

export default ScheduleAndLeaves;