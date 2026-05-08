import React from 'react';

function AlertMessage({ type, message }) {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className={`mb-4 p-4 rounded-xl border font-medium flex items-center gap-3 animate-fade-in ${
      isSuccess ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
    }`}>
      
      {isSuccess ? (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      ) : (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )}
      
     
      <span>{message}</span>
    </div>
  );
}

export default AlertMessage;