import React, { useState } from 'react';

function SettingsPage() {
  // දැනට තෝරාගෙන ඇති Tab එක මතක තියාගන්න (Default: 'security')
  const [activeTab, setActiveTab] = useState('security');

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your personal information, security, and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Settings Navigation (Tabs) */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-[2rem] p-4 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-2">
            
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-left ${
                activeTab === 'profile' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              My Profile
            </button>

            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-left ${
                activeTab === 'security' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Security & Password
            </button>

            <button 
              onClick={() => setActiveTab('preferences')}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-left ${
                activeTab === 'preferences' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Preferences
            </button>

          </div>
        </div>

        {/* Right Side: Tab Content */}
        <div className="flex-1 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
          
          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-extrabold text-slate-800 mb-6">Personal Information</h2>
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                <div className="w-20 h-20 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-black shadow-inner">
                  S
                </div>
                <div>
                  <button className="px-5 py-2.5 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all text-sm shadow-sm mb-2">Change Picture</button>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JPG, GIF or PNG. Max size of 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Full Name</label>
                  <input type="text" defaultValue="Sarah Johnson" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Email Address</label>
                  <input type="email" defaultValue="sarah.j@mediclinic.com" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+94 77 123 4567" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="px-8 py-3.5 rounded-xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all text-sm hover:-translate-y-0.5">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* 2. Security Tab (Password Change) */}
          {activeTab === 'security' && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-extrabold text-slate-800 mb-2">Change Password</h2>
              <p className="text-sm font-medium text-slate-500 mb-8 pb-8 border-b border-slate-100">Ensure your account is using a long, random password to stay secure.</p>
              
              <form className="max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button type="button" className="px-8 py-3.5 rounded-xl font-extrabold text-white bg-slate-800 hover:bg-slate-900 shadow-lg shadow-slate-800/20 transition-all text-sm hover:-translate-y-0.5">
                    Update Password
                  </button>
                  <button type="button" className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* 3. Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-extrabold text-slate-800 mb-2">System Preferences</h2>
              <p className="text-sm font-medium text-slate-500 mb-8 pb-8 border-b border-slate-100">Customize how you receive alerts and system updates.</p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div>
                    <h3 className="font-bold text-slate-800">Email Notifications</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">Receive daily summaries and alerts via email.</p>
                  </div>
                  {/* Mock Toggle Switch */}
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div>
                    <h3 className="font-bold text-slate-800">System Sounds</h3>
                    <p className="text-xs font-medium text-slate-500 mt-1">Play a sound when a new patient joins the queue.</p>
                  </div>
                  {/* Mock Toggle Switch (Off) */}
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer shadow-inner">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SettingsPage;