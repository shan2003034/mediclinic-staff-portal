import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  
  // States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState('');
  
  const dropdownRef = useRef(null);

  // Component එක ලෝඩ් වෙද්දී දත්ත ගැනීම
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('staffToken');
    
    // Role එක LocalStorage එකෙන් ගන්නවා
    const storedRole = localStorage.getItem('staffRole') || 'Staff'; 
    setRole(storedRole);

    if (userId && token && userId !== 'undefined') {
      axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        setFirstName(response.data.firstName || '');
        setLastName(response.data.lastName || '');
        if (response.data.profileImage) {
          setProfileImage(response.data.profileImage);
        }
      })
      .catch(err => console.error("Error fetching user data for Navbar", err));
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  const fullName = firstName ? `${firstName} ${lastName}` : 'User';

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login');   
  };

  const handleSettingsClick = () => {
    const r = role.toUpperCase();
    if (r === 'ADMIN') navigate('/admin/settings');
    else if (r === 'DOCTOR') navigate('/doctor/settings');
    else navigate('/reception/settings');
    
    setIsDropdownOpen(false); 
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 lg:px-10 py-4 flex items-center justify-between transition-all">
      
      <div className="hidden sm:block">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
          {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{firstName || 'User'}</span>!
        </h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">{today}</p>
      </div>

      <button onClick={onMenuClick} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>

      <div className="flex items-center ml-auto" ref={dropdownRef}>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="relative flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 leading-tight">{fullName}</p>
            <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">{role}</p>
          </div>
          
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100 bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              firstName ? firstName.charAt(0).toUpperCase() : 'U'
            )}
          </div>
          
          <svg className={`w-4 h-4 text-slate-400 hidden sm:block transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-50 animate-slide-up">
              <div onClick={handleSettingsClick} className="w-full text-left px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Settings
              </div>
              <div className="h-px bg-slate-100 my-1 mx-2"></div>
              <div onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Secure Logout
              </div>
            </div>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;