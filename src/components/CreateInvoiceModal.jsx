import React, { useState } from 'react';

function CreateInvoiceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Create New Invoice</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Generate a bill for patient services.</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 border border-slate-100 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Select Patient</label>
              <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none font-medium appearance-none transition-all">
                <option value="">Search Patient...</option>
                <option value="1">Shan Gajanayake (PID-1025)</option>
                <option value="2">Kasun Perera (PID-1024)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Billing Date</label>
              <input type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none font-medium transition-all" />
            </div>
          </div>

          {/* Service Items Section */}
          <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Service Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-3 items-center text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                <div className="col-span-6">Service / Item</div>
                <div className="col-span-3 text-center">Qty</div>
                <div className="col-span-3 text-right">Price (Rs.)</div>
              </div>
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-6">
                  <input type="text" placeholder="Consultation Fee" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium" />
                </div>
                <div className="col-span-3">
                  <input type="number" defaultValue="1" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-center" />
                </div>
                <div className="col-span-3">
                  <input type="number" placeholder="2500" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-right" />
                </div>
              </div>
            </div>
            <button className="mt-4 text-blue-600 font-bold text-xs flex items-center gap-1 hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Add Another Service
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Amount</p>
            <h3 className="text-2xl font-extrabold text-slate-800">Rs. 2,500.00</h3>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all text-sm shadow-sm">Cancel</button>
            <button className="px-8 py-3 rounded-xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:from-blue-700 transition-all text-sm">Create & Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateInvoiceModal;