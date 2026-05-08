import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ActiveConsultation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const appointment = state?.appointment;

  const [diagnosis, setDiagnosis] = useState('');
  const [medicineDetails, setMedicineDetails] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);

  // රෝගියෙක් නැතුව මේ පිටුවට ආවොත් Today Appointments එකට හරවලා යවනවා
  if (!appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">No Active Patient Found</h2>
          <button onClick={() => navigate('/doctor/todayAppointments')} className="text-blue-600 font-bold hover:underline">Go back to Queue</button>
        </div>
      </div>
    );
  }

  const handleSaveAndComplete = async () => {
    if (!diagnosis.trim() || !medicineDetails.trim()) {
      setError("Please fill in both Diagnosis and Medicine Details.");
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('staffToken');
      
      const payload = {
        appointmentId: appointment.appointmentId,
        diagnosis: diagnosis,
        medicineDetails: medicineDetails
      };

      await axios.post('http://localhost:8080/api/consultations/save', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(true);
      
      // Save වුණාට පස්සේ Today Appointments පිටුවට Redirect වෙනවා
      setTimeout(() => {
        navigate('/doctor/todayAppointments');
      }, 2000);

    } catch (err) {
      console.error("Save error:", err);
      setError("Failed to save consultation. Please try again.");
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in max-w-5xl mx-auto pb-24">
      
      <div className="flex items-center gap-4 mb-8">
        {/* Back බොත්තම එබුවමත් Today Appointments එකටම යනවා */}
        <button onClick={() => navigate('/doctor/todayAppointments')} className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Active Consultation</h1>
          <p className="text-slate-500 font-medium text-sm">Session ID: CON-500{appointment.appointmentId}</p>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-100">{error}</div>}
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl font-bold border border-green-200 flex items-center justify-center gap-3 animate-fade-in">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Consultation Saved Successfully! Redirecting...
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/40 mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg overflow-hidden border-4 border-white shrink-0 relative z-10">
          {appointment.patientProfileImage && !imgError ? (
            <img 
              src={appointment.patientProfileImage} 
              alt="" 
              className="w-full h-full object-cover" 
              onError={() => setImgError(true)} 
            />
          ) : (
            appointment.patientName ? appointment.patientName.charAt(0).toUpperCase() : 'U'
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-1">{appointment.patientName}</h2>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {appointment.timeSlot}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider border border-blue-100">
              Queue: {appointment.appointmentNumber}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg shadow-slate-200/30 flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Diagnosis & Notes</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Clinical Observations</p>
            </div>
          </div>
          <textarea 
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            disabled={success}
            placeholder="Type your clinical findings, symptoms, and diagnosis here..."
            className="w-full flex-1 min-h-[250px] p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700 resize-none"
          ></textarea>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg shadow-slate-200/30 flex flex-col">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Prescription (Rx)</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Medicine Details</p>
            </div>
          </div>
          <textarea 
            value={medicineDetails}
            onChange={(e) => setMedicineDetails(e.target.value)}
            disabled={success}
            placeholder="e.g.&#10;1. Amoxicillin 500mg - 1 Tablet (Twice a day)&#10;2. Paracetamol - 2 Tablets (When needed)"
            className="w-full flex-1 min-h-[250px] p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700 resize-none leading-relaxed"
          ></textarea>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 lg:left-72 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 px-8 flex justify-end z-40">
        <button 
          onClick={handleSaveAndComplete}
          disabled={isSaving || success}
          className={`px-8 py-4 rounded-xl font-extrabold text-white shadow-xl transition-all flex items-center gap-3 ${
            isSaving || success 
            ? 'bg-slate-400 cursor-not-allowed shadow-none' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-1'
          }`}
        >
          {isSaving ? 'Saving...' : success ? 'Completed!' : 'Save & Complete Consultation'}
          {!isSaving && !success && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
        </button>
      </div>

    </div>
  );
}

export default ActiveConsultation;