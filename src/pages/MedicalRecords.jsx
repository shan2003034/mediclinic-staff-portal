import React, { useState } from 'react';
import axios from 'axios';
import MedicalDocumentCard from '../components/MedicalDocumentCard';

function MedicalRecords() {
  const [patientId, setPatientId] = useState('');
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  
  const fetchRecords = async () => {
    if (!patientId) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('staffToken');
      const response = await axios.get(`http://localhost:8080/api/medical-documents/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments(response.data);
    } catch (err) {
      setError("No records found for this Patient ID.");
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Medical Records</h1>
        <p className="text-slate-500 font-medium mt-1">Access and review external patient diagnostic documents.</p>
      </div>

      {/* Search Bar Section */}
      <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/40 border border-slate-100 mb-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Enter Patient ID (e.g., 102)..."
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchRecords()}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all outline-none"
            />
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            onClick={fetchRecords}
            disabled={isLoading}
            className="px-8 py-4 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:bg-blue-400"
          >
            {isLoading ? 'Searching...' : 'Search Records'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {error && (
        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold">{error}</p>
        </div>
      )}

      {!error && documents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {documents.map((doc) => (
            <MedicalDocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}

      {!isLoading && !error && documents.length === 0 && patientId && (
        <div className="text-center py-20">
          <p className="text-slate-400 font-bold">Search for a Patient ID to see their medical documents.</p>
        </div>
      )}
    </div>
  );
}

export default MedicalRecords;