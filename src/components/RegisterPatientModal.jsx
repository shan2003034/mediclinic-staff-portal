import React, { useState } from 'react';
import axios from 'axios';

function RegisterPatientModal({ isOpen, onClose, onSuccess }) {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '',
    genderId: '',
    email: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.dob || !formData.genderId) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('staffToken');
      
      
      await axios.post('http://localhost:8080/api/reception/patients/register-walk-in', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        dob: formData.dob,
        genderId: parseInt(formData.genderId), 
        email: formData.email
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

     
      setFormData({ firstName: '', lastName: '', phoneNumber: '', dob: '', genderId: '', email: '' });
      setIsLoading(false);
      
      if (onSuccess) onSuccess();
      onClose();

    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to register patient. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] animate-slide-up overflow-hidden">
        
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Register Walk-in Patient</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Quick registration for new patients.</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 shadow-sm border border-slate-100 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-100">{error}</div>}

          <form id="registerPatientForm" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">First Name <span className="text-rose-500">*</span></label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Last Name <span className="text-rose-500">*</span></label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Date of Birth <span className="text-rose-500">*</span></label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} max={new Date().toISOString().split('T')[0]} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Email Address (Optional)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="johndoe@example.com" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Contact Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Phone Number <span className="text-rose-500">*</span></label>
                  <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="0771234567" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Gender <span className="text-rose-500">*</span></label>
                  <select name="genderId" value={formData.genderId} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-600 appearance-none">
                    <option value="">Select Gender...</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isLoading} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-all text-sm shadow-sm">
            Cancel
          </button>
          
          <button form="registerPatientForm" type="submit" disabled={isLoading} className="px-8 py-3 rounded-xl font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 transition-all text-sm hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
            {isLoading ? 'Registering...' : 'Register Patient'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPatientModal;