
import React, { useState } from 'react';
import { Play, Mail, Lock, User, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      if (isLogin) {
        success = await login(formData.email, formData.password);
        if (!success) setError('Invalid email or password');
      } else {
        success = await signup(formData.username, formData.email, formData.password);
        if (!success) setError('Email already registered');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-red-600 p-3 rounded-2xl mb-6 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            <Play className="w-8 h-8 fill-white text-white ml-1" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">MovieTube</h1>
          <p className="text-gray-400 flex items-center justify-center gap-2">
            AI-Powered Shoppable Video Platform <Sparkles className="w-4 h-4 text-red-500" />
          </p>
        </div>

        <div className="bg-[#1a1a1a] rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex p-1 bg-white/5 rounded-2xl mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${isLogin ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${!isLogin ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    required
                    placeholder="johndoe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-red-500 focus:outline-none transition-all"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-red-500 focus:outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-red-500 focus:outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-bold text-center animate-bounce">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_10px_20px_rgba(220,38,38,0.2)]"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'START WATCHING' : 'CREATE ACCOUNT'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-500 leading-relaxed px-4">
            By continuing, you agree to MovieTube's <span className="text-white cursor-pointer hover:underline">Terms of Service</span> and <span className="text-white cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm">
           <p>© 2024 MovieTube Inc. All Rights Reserved.</p>
           <p className="mt-1 text-red-500 font-bold opacity-80">Final Year Project - AI & Vision Specialization</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
