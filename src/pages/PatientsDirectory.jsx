import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterPatientModal from '../components/RegisterPatientModal';
import PatientProfileOffcanvas from '../components/PatientProfileOffcanvas';

function PatientsDirectory() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patientsPerPage = 5;

  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('staffToken');
        const response = await axios.get('http://localhost:8080/api/reception/patients/directory', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPatients(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  
  const filteredPatients = patients.filter(patient => 
    (patient.fullName && patient.fullName.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (patient.patientId && patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.phoneNumber && patient.phoneNumber.includes(searchTerm))
  );


  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in relative">
      
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Patients Directory</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and search all registered patients in the clinic.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          
          
          <div className="relative w-full sm:w-72">
            <input 
              type="text" 
              placeholder="Search name, ID, phone..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); 
              }}
              className="w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700"
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <button 
            onClick={() => setIsRegisterModalOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-600 transition-all text-sm flex items-center justify-center gap-2 whitespace-nowrap hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            Walk-in Register
          </button>
        </div>
      </div>

     
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Patient Details</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Registered Date</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-slate-400 font-bold">Loading patients...</td>
                </tr>
              ) : currentPatients.length > 0 ? (
                currentPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-extrabold text-lg overflow-hidden shrink-0">
                        {patient.profileImgPath ? (
                          <img src={patient.profileImgPath} alt="" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex';}} />
                        ) : null}
                        <span className={patient.profileImgPath ? "hidden" : "flex w-full h-full items-center justify-center"}>
                          {patient.fullName ? patient.fullName.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <div>
                        <button 
                          onClick={() => setSelectedPatient(patient)}
                          className="font-bold text-slate-800 hover:text-blue-600 transition-colors text-left"
                        >
                          {patient.fullName}
                        </button>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{patient.patientId} • {patient.gender}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-600 font-semibold text-sm">{patient.phoneNumber}</td>
                    <td className="px-8 py-5 text-slate-600 font-medium text-sm">{patient.registeredDate}</td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest border shadow-sm ${
                        patient.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => setSelectedPatient(patient)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="View Profile"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-slate-400 font-medium">No patients found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium hidden sm:block">
            Showing <span className="font-bold text-slate-800">{indexOfFirstPatient + 1}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastPatient, filteredPatients.length)}</span> of <span className="font-bold text-slate-800">{filteredPatients.length}</span> patients
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

      <RegisterPatientModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />

      <PatientProfileOffcanvas 
        patient={selectedPatient} 
        isOpen={!!selectedPatient} 
        onClose={() => setSelectedPatient(null)} 
      />

    </div>
  );
}

export default PatientsDirectory;