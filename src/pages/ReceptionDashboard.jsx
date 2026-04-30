import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import DoctorAvailabilityCard from '../components/DoctorAvailabilityCard';
import NewAppointmentModal from '../components/NewAppointmentModal'; // 1. අලුත් Component එක Import කරගත්තා

function ReceptionDashboard() {
  // 2. Modal එක Open කරන්න සහ Close කරන්න State එකක් හැදුවා
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const stats = [
    { label: "Today's Appointments", value: "48", iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "blue" },
    { label: "Checked In", value: "32", iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
    { label: "Pending", value: "12", iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "amber" },
    { label: "Canceled", value: "04", iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", color: "rose" },
  ];

  const upcomingAppointments = [
    { id: "APT-102", patient: "Kamal Perera", doctor: "Dr. Sarah Johnson", time: "10:30 AM", status: "Checked In" },
    { id: "APT-103", patient: "Nimali Silva", doctor: "Dr. Michael Lee", time: "10:45 AM", status: "Confirmed" },
    { id: "APT-104", patient: "Sunil Gamage", doctor: "Dr. Sarah Johnson", time: "11:00 AM", status: "Confirmed" },
    { id: "APT-105", patient: "Ruwan Dias", doctor: "Dr. Emily Chen", time: "11:15 AM", status: "Late" },
  ];

  const doctorAvailability = [
    { name: "Dr. Sarah Johnson", specialty: "Cardiology", status: "In Session", color: "blue", imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop" },
    { name: "Dr. Michael Lee", specialty: "Neurology", status: "Available", color: "emerald", imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop" },
    { name: "Dr. Emily Chen", specialty: "Pediatrics", status: "On Break", color: "amber", imageUrl: "https://images.unsplash.com/photo-1594824436951-7f12bcceabcac?q=80&w=150&auto=format&fit=crop" },
  ];

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in relative">
      
      {/* 1. Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Reception Dashboard</h1>
          <p className="text-slate-500 font-medium mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="bg-white text-slate-600 font-bold px-6 py-3 rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-all text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print Sheet
          </button>
          
          {/* 3. New Appointment Button එකට onClick එක දැම්මා */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 transition-all text-sm flex items-center gap-2 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            New Appointment
          </button>
        </div>
      </div>

      {/* 2. Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        
        {/* 3. Upcoming Appointments Table */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-800">Next Appointments</h3>
            <button className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors px-4 py-2 hover:bg-blue-50 rounded-xl">
              View All
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Patient</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Doctor</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Time</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {upcomingAppointments.map((apt, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{apt.patient}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{apt.id}</p>
                    </td>
                    <td className="px-8 py-5 text-slate-600 font-semibold text-sm">{apt.doctor}</td>
                    <td className="px-8 py-5 text-slate-600 font-bold text-sm">{apt.time}</td>
                    <td className="px-8 py-5 text-right">
                      <span className={`text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest border shadow-sm ${
                        apt.status === 'Checked In' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        apt.status === 'Late' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Doctor Availability */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
            <h3 className="text-xl font-extrabold text-slate-800">Doctor Availability</h3>
          </div>
          
          <div className="space-y-2 flex-1">
            {doctorAvailability.map((doc, i) => (
              <DoctorAvailabilityCard 
                key={i}
                name={doc.name}
                specialty={doc.specialty}
                status={doc.status}
                color={doc.color}
                imageUrl={doc.imageUrl}
              />
            ))}
          </div>

          <button className="w-full mt-8 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all text-sm hover:text-blue-600 hover:border-blue-100">
            View Full Schedule
          </button>
        </div>

      </div>

      {/* 4. Modal එක පිටුවේ යටින්ම Render කරනවා */}
      <NewAppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}

export default ReceptionDashboard;