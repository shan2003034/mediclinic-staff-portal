import React from 'react';
import StatCard from '../components/StatCard';
import PatientQueueCard from '../components/PatientQueueCard';

function DoctorDashboard() {
  // Stats
  const stats = [
    { label: "Today's Patients", value: "32", iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "blue" },
    { label: "Waiting in Queue", value: "08", iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
    { label: "Completed", value: "24", iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
  ];

  // Queue Data - මෙතනට මම 'patientId' එකක් අලුතින් එකතු කළා
  const queuePatients = [
    { patientId: "PID-501", number: "09", name: "Kamal Gunawardena", type: "Follow-up", time: "10:45 AM" },
    { patientId: "PID-502", number: "10", name: "Nimali Rathnayake", type: "New Consultation", time: "11:00 AM" },
    { patientId: "PID-503", number: "11", name: "Sunil Perera", type: "Report Review", time: "11:15 AM" },
    { patientId: "PID-504", number: "12", name: "Priya Fernando", type: "Follow-up", time: "11:30 AM" },
  ];

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in relative">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Doctor Dashboard</h1>
          <p className="text-slate-500 font-medium mt-1">You have 8 patients waiting in the queue. Have a great session!</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100 shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Status: Available</span>
        </div>
      </div>

      {/* Stats Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Patient Queue (Main) */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
            <h3 className="text-xl font-extrabold text-slate-800">Live Patient Queue</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg">Estimated: 1h 20m left</span>
          </div>
          
          <div className="space-y-3">
            {queuePatients.map((p, i) => (
              <PatientQueueCard key={i} {...p} />
            ))}
          </div>
          
          <button className="w-full mt-8 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all text-sm">
            View Full List
          </button>
        </div>

        {/* Right Column: Daily Schedule Overview */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h3 className="text-xl font-extrabold text-slate-800 mb-6 pb-4 border-b border-slate-50">Today's Schedule</h3>
          
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {[
              { time: "09:00 AM", task: "Morning Rounds", sub: "Ward A & B", color: "blue" },
              { time: "10:30 AM", task: "OPD Sessions", sub: "Room 04 (Current)", color: "emerald" },
              { time: "01:00 PM", task: "Lunch Break", sub: "Cafeteria", color: "amber" },
              { time: "02:00 PM", task: "Specialist Clinic", sub: "Cardiology Unit", color: "blue" },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 relative z-10">
                <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm ring-1 ring-slate-100 ${
                  item.color === 'blue' ? 'bg-blue-500' : item.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}></div>
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{item.time}</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{item.task}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DoctorDashboard;