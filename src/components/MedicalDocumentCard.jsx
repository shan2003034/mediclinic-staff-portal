import React from 'react';

function MedicalDocumentCard({ doc }) {
  
  const getFileIcon = (type) => {
    if (type?.toLowerCase().includes('x-ray')) return '🩻';
    if (type?.toLowerCase().includes('blood')) return '🩸';
    return '📄';
  };

  return (
    <div className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-slate-50 text-2xl rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
          {getFileIcon(doc.documentType)}
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-extrabold uppercase tracking-wider rounded-lg">
          {doc.documentType || 'General'}
        </span>
      </div>
      
      <h3 className="text-lg font-extrabold text-slate-800 leading-tight mb-1 truncate" title={doc.documentName}>
        {doc.documentName}
      </h3>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
        Source: {doc.sourceName}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <span className="text-[11px] font-semibold text-slate-500">
          {doc.dateAdded}
        </span>
        <a 
          href={doc.fileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-bold text-xs flex items-center gap-1 group/btn"
        >
          View File
          <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default MedicalDocumentCard;