import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // 1. URL එක බලන්න මේක Import කරගත්තා
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

function StaffLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation(); // දැනට ඉන්න URL එක ගන්නවා

  // 2. URL එක අනුව Role එක මොකක්ද කියලා තීරණය කරන Logic එක
  let currentRole = 'reception'; // Default විදිහට reception තියෙනවා
  let displayRole = 'Receptionist';
  let userName = 'Sarah Johnson';

  // URL එකේ මුල '/doctor' කියලා තියෙනවා නම් Doctor කෙනෙක් විදිහට මාරු වෙනවා
  if (location.pathname.startsWith('/doctor')) {
    currentRole = 'doctor';
    displayRole = 'Doctor';
    userName = 'Dr. Sarah Johnson';
  } 
  // URL එකේ මුල '/admin' කියලා තියෙනවා නම් Admin කෙනෙක් විදිහට මාරු වෙනවා
  else if (location.pathname.startsWith('/admin')) {
    currentRole = 'admin';
    displayRole = 'Administrator';
    userName = 'Admin User';
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* 3. දැන් Sidebar එකට යන්නේ Dynamic Role එක */}
      <Sidebar 
        userRole={currentRole} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* 4. Navbar එකටත් අදාළ Role එක යවනවා */}
        <Navbar 
          userRole={displayRole} 
          userName={userName} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default StaffLayout;