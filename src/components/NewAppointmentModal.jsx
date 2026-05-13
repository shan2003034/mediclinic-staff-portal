import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewAppointmentModal({ isOpen, onClose, onSuccess }) {
  
  const [patients, setPatients] = useState([]); 
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    patientId: '', 
    doctorId: '',
    appointmentDate: '',
    timeSlotId: '',
    reasonForVisit: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  
  useEffect(() => {
    if (isOpen) {
      fetchPatients();
      fetchDoctors();
      setFormData({
        patientId: '', doctorId: '',
        appointmentDate: '', timeSlotId: '', reasonForVisit: ''
      });
      setSearchTerm('');
      setTimeSlots([]);
      setError('');
    }
  }, [isOpen]);


  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('staffToken');
      const response = await axios.get('http://localhost:8080/api/reception/patients/directory', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(response.data);
    } catch (err) {
      console.error("Error fetching patients:", err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('staffToken');
      const response = await axios.get('http://localhost:8080/api/reception/appointments/doctors-list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctors(response.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };


  useEffect(() => {
    if (formData.doctorId && formData.appointmentDate) {
      fetchTimeSlots(formData.doctorId, formData.appointmentDate);
    } else {
      setTimeSlots([]); 
    }
  }, [formData.doctorId, formData.appointmentDate]);

  const fetchTimeSlots = async (docId, date) => {
    try {
      const token = localStorage.getItem('staffToken');
      const response = await axios.get(`http://localhost:8080/api/reception/appointments/available-slots?doctorId=${docId}&date=${date}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTimeSlots(response.data);
    } catch (err) {
      console.error("Error fetching time slots:", err);
      setTimeSlots([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (!formData.patientId || !formData.doctorId || !formData.appointmentDate || !formData.timeSlotId) {
      setError("Please fill in all required fields (Patient, Doctor, Date, Time).");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('staffToken');
      
      await axios.post('http://localhost:8080/api/reception/appointments/book', {
        ...formData,
        patientId: parseInt(formData.patientId),
        doctorId: parseInt(formData.doctorId),
        timeSlotId: parseInt(formData.timeSlotId)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsLoading(false);
      if (onSuccess) onSuccess(); 
      onClose(); 

    } catch (err) {
      console.error("Booking error:", err);
      setError("Failed to book appointment. Please try again.");
      setIsLoading(false);
    }
  };

  
  const filteredPatients = patients.filter(p => 
    (p.fullName && p.fullName.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (p.patientId && p.patientId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.phoneNumber && p.phoneNumber.includes(searchTerm))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose} 
      ></div>

      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] animate-slide-up overflow-hidden">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">New Appointment</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Schedule a new visit for a patient.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 shadow-sm border border-slate-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-100">{error}</div>}

          <form id="newApptForm" onSubmit={handleSubmit} className="space-y-6">
            
            
            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Patient Information</h3>
              <div className="relative">
                <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Search & Select Patient <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search patient by name, ID, or phone..." 
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      if (formData.patientId) setFormData({...formData, patientId: ''}); 
                    }}
                    className={`w-full px-5 py-3.5 bg-slate-50 border ${formData.patientId ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'} rounded-2xl outline-none transition-all font-medium text-slate-700`}
                  />
                  
                  {formData.patientId ? (
                    <svg className="w-5 h-5 text-emerald-500 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                    <svg className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  )}
                </div>

                {/* Dropdown Results */}
                {searchTerm && !formData.patientId && (
                  <div className="absolute z-[110] w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl max-h-48 overflow-y-auto p-2">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map(p => (
                        <button 
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setFormData({...formData, patientId: p.id});
                            setSearchTerm(`${p.fullName} (${p.phoneNumber})`); 
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl transition-all flex justify-between items-center group"
                        >
                          <div>
                            <p className="font-bold text-slate-800 text-sm group-hover:text-blue-700">{p.fullName}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.patientId} • {p.phoneNumber}</p>
                          </div>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">SELECT</span>
                        </button>
                      ))
                    ) : (
                      <p className="p-4 text-center text-slate-400 font-bold text-xs">No patients found. Please register them first.</p>
                    )}
                  </div>
                )}
                
                
                {formData.patientId && (
                  <button 
                    type="button"
                    onClick={() => { setFormData({...formData, patientId: ''}); setSearchTerm(''); }}
                    className="mt-2 text-xs font-bold text-rose-500 hover:underline flex items-center gap-1 ml-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    Clear Selection
                  </button>
                )}
              </div>
            </div>

            {/* Appointment Details */}
            <div className="pt-2">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Appointment Details</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Select Doctor <span className="text-rose-500">*</span></label>
                  <select name="doctorId" value={formData.doctorId} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 appearance-none cursor-pointer">
                    <option value="">Choose a specialist...</option>
                    {doctors.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialty})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Date <span className="text-rose-500">*</span></label>
                    <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 cursor-pointer" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Time Slot <span className="text-rose-500">*</span></label>
                    <select name="timeSlotId" value={formData.timeSlotId} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 appearance-none cursor-pointer" disabled={!formData.doctorId || !formData.appointmentDate || timeSlots.length === 0}>
                      <option value="">
                        {!formData.doctorId || !formData.appointmentDate ? "Select Date & Doctor first" : timeSlots.length === 0 ? "No slots available" : "Select time..."}
                      </option>
                      {timeSlots.map(slot => (
                        <option key={slot.id} value={slot.id}>{slot.timeRange}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Reason for Visit (Optional)</label>
                  <textarea name="reasonForVisit" value={formData.reasonForVisit} onChange={handleChange} rows="2" placeholder="Briefly describe the symptoms..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 resize-none"></textarea>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-all text-sm shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="newApptForm" 
            disabled={isLoading}
            className="px-8 py-3 rounded-xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all text-sm hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default NewAppointmentModal;