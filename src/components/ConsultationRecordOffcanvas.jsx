import React, { useRef, useState, useEffect } from 'react';

function ConsultationRecordOffcanvas({ isOpen, onClose, record }) {
  const printRef = useRef();
  
  // 👇 අලුත් State එක: පින්තූරය ලෝඩ් වෙන්නේ නැත්නම් මේක true වෙනවා
  const [imgError, setImgError] = useState(false);

  // රෝගියා මාරු වෙන හැම වෙලාවෙම error state එක අලුත් කරනවා
  useEffect(() => {
    setImgError(false);
  }, [record]);

  if (!isOpen || !record) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>

      {/* Slide-over Panel */}
      <div className={`relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div ref={printRef} id="printable-area" className="flex-1 flex flex-col overflow-y-auto">
          
          {/* Header */}
          <div className="p-8 border-b border-slate-100 bg-slate-50/80 pt-12">
            <div className="flex items-center gap-5">
              
              {/* 👇 යාවත්කාලීන කළ පින්තූරය පෙන්වන කොටස */}
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg overflow-hidden border-2 border-white shrink-0">
                {record.patientProfileImage && !imgError ? (
                  <img 
                    src={record.patientProfileImage} 
                    alt={record.patientName} 
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)} // පින්තූරය අවුල් නම් අකුර පෙන්වන්න imgError එක true කරනවා
                  />
                ) : (
                  record.patientName.charAt(0) // පින්තූරය නැත්නම් හෝ Error ආවොත් නමේ මුල් අකුර පෙන්වනවා
                )}
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-800">{record.patientName}</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Session: {record.id}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <span className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold">
                {record.date} • {record.time}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Diagnosis</h3>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <p className="text-sm font-bold text-slate-800">{record.reason || "No diagnosis details provided."}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Prescription Issued ({record.prescriptionId})</h3>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-700 whitespace-pre-line leading-relaxed">{record.medicineDetails || "No medicines prescribed for this session."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 no-print">
          <button 
            onClick={handlePrint}
            className="flex-1 py-3.5 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all text-sm flex items-center justify-center gap-2"
          >
            Print Record
          </button>
          <button onClick={onClose} className="flex-1 py-3.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all text-sm">
            Close Panel
          </button>
        </div>
      </div>

      {/* Print CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #printable-area, #printable-area * { visibility: visible; }
          #printable-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}} />
    </div>
  );
}

export default ConsultationRecordOffcanvas;