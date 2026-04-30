import React from 'react';
import PatientBriefCard from '../components/PatientBriefCard';
import PrescriptionBuilder from '../components/PrescriptionBuilder';

function ActiveConsultation() {
  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in space-y-8">
      
      {/* 1. Header with Patient Brief */}
      <PatientBriefCard 
        patientName="Kamal Gunawardena" 
        age="42" 
        gender="Male" 
        bloodGroup="B+" 
        lastVisit="12 Jan 2026" 
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 2. Left: Clinical Notes & Diagnosis */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
            <h3 className="text-lg font-extrabold text-slate-800 mb-4">Clinical Observations</h3>
            <textarea 
              rows="6" 
              placeholder="Start typing patient symptoms, observations, and findings here..." 
              className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 resize-none shadow-inner"
            ></textarea>
          </div>

          <PrescriptionBuilder />
        </div>

        {/* 3. Right: Vitals & History Sidebar */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-6">Patient Vitals</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] font-bold opacity-60 uppercase">BP (mmHg)</p>
                <input type="text" defaultValue="120/80" className="bg-transparent text-xl font-black w-full outline-none mt-1" />
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                <p className="text-[10px] font-bold opacity-60 uppercase">Weight (Kg)</p>
                <input type="text" defaultValue="72" className="bg-transparent text-xl font-black w-full outline-none mt-1" />
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/30">
            <h3 className="text-lg font-extrabold mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-4 bg-white text-blue-600 font-extrabold rounded-2xl hover:scale-[1.02] transition-all">
                End Consultation
              </button>
              <button className="w-full py-4 bg-blue-500/50 text-white font-bold rounded-2xl border border-blue-400/30 hover:bg-blue-500 transition-all text-sm">
                Request Lab Test
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ActiveConsultation;