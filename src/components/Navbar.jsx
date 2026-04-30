import React from 'react';

// අලුතින් onMenuClick කියන prop එක එකතු කළා
function Navbar({ userName = "Sarah Johnson", userRole = "Receptionist", onMenuClick }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 lg:px-10 py-4 flex items-center justify-between transition-all">
      
      <div className="hidden sm:block">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
          Good Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{userName}</span>!
        </h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">{today}</p>
      </div>

      {/* Mobile Menu Button - මේකට තමයි onClick එක දැම්මේ */}
      <button 
        onClick={onMenuClick}
        className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>

      {/* අනිත් කොටස් ඔක්කොම කලින් වගේමයි */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden md:block relative">
          <input type="text" placeholder="Search patients, IDs..." className="w-64 pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-sm font-medium text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400" />
          <svg className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <div className="hidden sm:block w-px h-8 bg-slate-200"></div>

        <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>

        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 leading-tight">{userName}</p>
            <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">{userRole}</p>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <svg className="w-4 h-4 text-slate-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;