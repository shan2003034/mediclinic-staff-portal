import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  
  const userId = localStorage.getItem('userId') || 1; 
  const token = localStorage.getItem('staffToken');

  // Profile States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Password States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status States
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    if (userId && token) {
      axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        setFirstName(response.data.firstName || '');
        setLastName(response.data.lastName || '');
        setEmail(response.data.email || '');
        
        
        if (response.data.profileImage) {
          setImagePreview(response.data.profileImage);
        }
      })
      .catch(err => {
        console.error("Error fetching user data", err);
      });
    }
  }, [userId, token]);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify({
      firstName,
      lastName,
      email
    })], { type: 'application/json' }));

    if (profileImage) {
      formData.append('image', profileImage);
    }

    try {
      await axios.put(`http://localhost:8080/api/users/${userId}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Profile updated successfully!');
      localStorage.setItem('staffEmail', email);
    } catch (err) {
      
      const errorMsg = err.response?.data?.message || err.response?.data?.error || (typeof err.response?.data === 'string' ? err.response?.data : 'Failed to update profile');
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Password Update කිරීම (Token එක සමඟ)
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New password and Confirm password do not match!');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/users/${userId}/password`, {
        currentPassword,
        newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      setMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || (typeof err.response?.data === 'string' ? err.response?.data : 'Failed to update password');
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your personal information and security.</p>
      </div>

      {message && <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 font-medium">{message}</div>}
      {error && <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">{error}</div>}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-[2rem] p-4 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-2">
            <button onClick={() => {setActiveTab('profile'); setMessage(''); setError('');}} className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-left ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              My Profile
            </button>
            <button onClick={() => {setActiveTab('security'); setMessage(''); setError('');}} className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all text-left ${activeTab === 'security' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Security & Password
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
          {activeTab === 'profile' && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-extrabold text-slate-800 mb-6">Personal Information</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="w-20 h-20 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-black shadow-inner overflow-hidden border-2 border-slate-100">
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : (firstName ? firstName.charAt(0).toUpperCase() : 'U')}
                  </div>
                  <div>
                    <input type="file" accept="image/png, image/jpeg, image/gif" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
                    <button type="button" onClick={() => fileInputRef.current.click()} className="px-5 py-2.5 bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all text-sm shadow-sm mb-2">Choose Picture</button>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button type="submit" disabled={isLoading} className={`px-8 py-3.5 rounded-xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 transition-all text-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700'}`}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-extrabold text-slate-800 mb-2">Change Password</h2>
              <p className="text-sm font-medium text-slate-500 mb-8 pb-8 border-b border-slate-100">Ensure your account is using a long, random password to stay secure.</p>
              <form onSubmit={handlePasswordUpdate} className="max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Current Password</label>
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Confirm New Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
                <div className="pt-4 flex items-center gap-4">
                  <button type="submit" disabled={isLoading} className={`px-8 py-3.5 rounded-xl font-extrabold text-white bg-slate-800 shadow-lg shadow-slate-800/20 transition-all text-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-900 hover:-translate-y-0.5'}`}>
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                  <button type="button" onClick={() => {setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');}} className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">Clear</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;