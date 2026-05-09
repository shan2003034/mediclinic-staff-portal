import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard';
import NextPatientCard from '../components/NextPatientCard';

function DoctorDashboard() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

 
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('staffToken');
        
        const response = await axios.get(`http://localhost:8080/api/doctor-dashboard/${userId}/summary`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setSummary(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard data.");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500 font-bold">{error}</div>;
  }

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-1">{todayDate}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Overview</h1>
        </div>
      </div>

      {/* Highlighted Next Patient Section */}
      <div className="mb-10">
        <NextPatientCard 
          patientName={summary.nextPatientName} 
          time={summary.nextPatientTime} 
          image={summary.nextPatientImage} 
        />
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <StatCard 
          title="Total Patients" 
          value={summary.totalPatientsToday} 
          bgColorClass="bg-blue-50"
          colorClass="text-blue-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
        />
        
        <StatCard 
          title="Completed" 
          value={summary.completedPatientsToday} 
          bgColorClass="bg-emerald-50"
          colorClass="text-emerald-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
        />

        <StatCard 
          title="Waiting" 
          value={summary.waitingPatientsToday} 
          bgColorClass="bg-amber-50"
          colorClass="text-amber-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
        />

        <StatCard 
          title="Earnings (LKR)" 
          value={`Rs. ${summary.totalEarningsToday.toLocaleString()}`} 
          bgColorClass="bg-indigo-50"
          colorClass="text-indigo-600"
          icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
        />

      </div>

    </div>
  );
}

export default DoctorDashboard;