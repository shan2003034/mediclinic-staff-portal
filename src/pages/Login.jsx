import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Redirect කරන්න useNavigate ගත්තා
import axios from 'axios'; // 2. API Call කරන්න Axios ගත්තා
import mediclinicLogo from '../assets/mediclinic-logo.png'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // වැරදි පාස්වර්ඩ් ගැහුවොත් Error එක පෙන්වන්න
  const [isLoading, setIsLoading] = useState(false); // ලොග් වෙනකම් බට්න් එක ලෝඩ් වෙනවා පෙන්වන්න

  const navigate = useNavigate();

  // --- Backend එකත් එක්ක සම්බන්ධ වෙන ප්‍රධානම Function එක ---
  const handleLogin = async (e) => {
    e.preventDefault(); // Form එක Submit වෙද්දි පේජ් එක Refresh වෙන එක නවත්වනවා
    setError('');
    setIsLoading(true);

    try {
      // Backend එකට Email, Password යවනවා
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/staff-login`, {
        email: email,
        password: password
      });

      // Backend එකෙන් එන Token එක සහ Role එක ගන්නවා
      const { token, role } = response.data;

      // 3. LocalStorage එකේ Data සේව් කරනවා (Dashboard එකේ පාවිච්චියට)
      localStorage.setItem('staffToken', token);
      localStorage.setItem('staffRole', role);
      localStorage.setItem('staffEmail', email); 
      // (ඔයාට Backend එකෙන් Name එකකුත් එවනවා නම් ඒකත් මෙතනදි setItem කරන්න පුළුවන්)

      // 4. Role එක අනුව අදාළ Dashboard එකට Redirect කරනවා
      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'DOCTOR') {
        navigate('/doctor');
      } else if (role === 'RECEPTIONIST' || role === 'RECEPTION') {
        navigate('/reception');
      } else {
        setError('Unrecognized user role! Please contact IT.');
      }

    } catch (err) {
      // Backend එකෙන් Error එකක් ආවොත් (උදා: පාස්වර්ඩ් වැරදියි)
      console.error("Login Error:", err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans animate-fade-in">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        
        {/* -- ප්‍රධාන CARD එක -- */}
        <div className="bg-white py-10 px-8 shadow-2xl shadow-slate-200/50 sm:rounded-[2.5rem] sm:px-12 border border-slate-100 transition-all duration-300">
          
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 justify-center sm:justify-start">
            <img 
              src={mediclinicLogo} 
              alt="MediClinic Logo" 
              className="w-14 h-14 object-contain" 
            />
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tighter">
                Medi<span className="text-blue-600">Clinic</span>
              </h1>
              <p className="text-slate-500 text-sm font-medium">Hospital Management System</p>
            </div>
          </div>

          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">
              Staff Portal Access
            </h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Authorized Personnel Only
            </p>
          </div>
          
          {/* Form එකට onSubmit එක සම්බන්ධ කරලා තියෙන්නේ */}
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Error Message පෙන්වන කොටස */}
            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100 text-center font-semibold">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">
                Email or Staff ID
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="appearance-none block w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700" 
                  placeholder="doctor.name@mediclinic.com" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="appearance-none block w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-md cursor-pointer" />
                <label htmlFor="remember-me" className="ml-2.5 block text-sm text-slate-600 font-semibold cursor-pointer">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-bold text-blue-600 hover:text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button 
                type="submit" // මෙතන type="button" තිබ්බ එක type="submit" කළා
                disabled={isLoading} // ලෝඩ් වෙද්දි ආයේ ඔබන්න බැරි වෙන්න
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-blue-500/30 text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:-translate-y-0.5 active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Authenticating...' : 'Sign in to Secure Portal'}
              </button>
            </div>
            
          </form>
        </div>
        
        {/* Footer info */}
        <p className="text-center text-xs text-slate-400 mt-10 font-medium">
          &copy; 2026 MediClinic Hospital. <br/>
          Unauthorized access is strictly prohibited. <br/>
          <a href="#" className="font-bold text-slate-500 hover:text-blue-600">Sign in as Patient</a>
        </p>
      </div>
    </div>
  );
}

export default Login;