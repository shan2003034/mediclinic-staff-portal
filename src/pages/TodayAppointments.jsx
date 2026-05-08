import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentQueueCard from '../components/AppointmentQueueCard';

function TodayAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodayQueue = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('staffToken');

        if (!userId || !token) {
          setError("Authentication error. Please login again.");
          setIsLoading(false);
          return;
        }

        
        const response = await axios.get(`http://localhost:8080/api/appointments/doctor/${userId}/today`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAppointments(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching today's appointments:", err);
        setError("Failed to load today's queue. Please refresh.");
        setIsLoading(false);
      }
    };

    fetchTodayQueue();
  }, []);

  
  const todayString = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  
  const totalPatients = appointments.length;
  const waitingPatients = appointments.filter(a => a.status !== 'Completed').length;
  const completedPatients = appointments.filter(a => a.status === 'Completed').length;

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in max-w-6xl mx-auto">
      
     
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-100">
        <div>
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">{todayString}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Today's Queue</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your active appointments and patient flow for today.</p>
        </div>

       
        <div className="flex gap-4">
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waiting</p>
            <p className="text-2xl font-black text-amber-500">{waitingPatients}</p>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</p>
            <p className="text-2xl font-black text-green-500">{completedPatients}</p>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm text-center hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
            <p className="text-2xl font-black text-blue-600">{totalPatients}</p>
          </div>
        </div>
      </div>

      
      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-100 flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {error}
        </div>
      )}

   
      <div className="space-y-4">
        {isLoading ? (
          
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-slate-500">Loading today's queue...</p>
          </div>
        ) : appointments.length > 0 ? (
          
          appointments.map((app) => (
            <AppointmentQueueCard key={app.appointmentId} appointment={app} />
          ))
        ) : (
         
          <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-800 mb-2">No Appointments Yet</h3>
            <p className="text-slate-500 font-medium">You don't have any patients scheduled for today so far.</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default TodayAppointments;