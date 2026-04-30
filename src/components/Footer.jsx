import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 px-6 lg:px-10 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <p className="text-slate-400 text-sm font-medium">
          &copy; {currentYear} <span className="font-bold text-slate-500">MediClinic Hospital</span>. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Help Center</a>
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Terms of Service</a>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;