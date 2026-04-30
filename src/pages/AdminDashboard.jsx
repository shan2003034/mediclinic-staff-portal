import React, { useState } from 'react';
import StatCard from '../components/StatCard';

function AdminDashboard() {
  // 1. Pagination States for Recent Activities
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 2. Stats Data
  const stats = [
    { label: "Total Revenue (This Month)", value: "Rs. 4.2M", iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
    { label: "Total Patients", value: "12,450", iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "blue" },
    { label: "Active Staff Members", value: "84", iconPath: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2", color: "violet" },
    { label: "System Alerts", value: "03", iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", color: "rose" },
  ];

  // 3. Weekly Revenue Mock Data (For Bar Chart)
  const weeklyRevenue = [
    { day: 'Mon', value: 40, amount: '45K' },
    { day: 'Tue', value: 65, amount: '80K' },
    { day: 'Wed', value: 35, amount: '40K' },
    { day: 'Thu', value: 85, amount: '110K' },
    { day: 'Fri', value: 55, amount: '60K' },
    { day: 'Sat', value: 95, amount: '130K' },
    { day: 'Sun', value: 70, amount: '90K' },
  ];

  // 4. Mock Data for Recent Activities (Pagination පෙන්වීමට 12ක් සාදා ඇත)
  const allActivities = Array.from({ length: 12 }, (_, i) => ({
    id: `ACT-90${i + 1}`,
    description: i % 3 === 0 ? "New Doctor Account Created" : i % 2 === 0 ? "High-value Invoice Paid (Rs. 45,000)" : "System Backup Completed",
    user: i % 3 === 0 ? "Super Admin" : i % 2 === 0 ? "Reception Desk 01" : "System Auto",
    date: `2026-04-${27 - (i % 3)}`,
    time: `0${9 + (i % 5)}:15 AM`,
    status: i % 5 === 0 ? "Warning" : "Success"
  }));

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = allActivities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allActivities.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in relative">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">System Overview</h1>
          <p className="text-slate-500 font-medium mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-slate-600 font-bold px-6 py-3.5 rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all text-sm flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Area (Reusable Component) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, idx) => (
          <StatCard key={idx} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
        
        {/* 1. Revenue Chart Area (Tailwind Custom Chart) */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-slate-800">Weekly Revenue</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Last 7 days clinic income</p>
            </div>
            <select className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-600 text-sm outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>

          {/* Pure Tailwind Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-10">
            {weeklyRevenue.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 group">
                {/* Tooltip (Hover Amount) */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2">
                  Rs. {item.amount}
                </span>
                {/* Bar */}
                <div 
                  className="w-full max-w-[3rem] bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-xl transition-all duration-500 group-hover:from-blue-500 group-hover:to-indigo-300"
                  style={{ height: `${item.value}%` }}
                ></div>
                {/* Day Label */}
                <span className="text-xs font-bold text-slate-400 mt-3">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Quick Actions / System Health */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          
          <h3 className="text-xl font-extrabold mb-6">System Health</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                <span>Database Storage</span>
                <span>45%</span>
              </div>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                <span>Server Load</span>
                <span>28%</span>
              </div>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10">
            <h4 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                Add New Staff Member
              </button>
              <button className="w-full py-3.5 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 font-bold rounded-xl transition-all text-sm border border-rose-500/30">
                Run Manual Backup
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Activities Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-extrabold text-slate-800">Recent System Activities</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Activity & ID</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Initiated By</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentActivities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="font-bold text-slate-800">{act.description}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{act.id}</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-semibold text-slate-600 text-sm flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${act.user === 'Super Admin' ? 'bg-violet-500' : act.user === 'System Auto' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                      {act.user}
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-800">{act.date}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{act.time}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`inline-block text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase border ${
                      act.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium hidden sm:block">
            Showing <span className="font-bold text-slate-800">{indexOfFirstItem + 1}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastItem, allActivities.length)}</span> of <span className="font-bold text-slate-800">{allActivities.length}</span> activities
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

    </div>
  );
}

export default AdminDashboard;