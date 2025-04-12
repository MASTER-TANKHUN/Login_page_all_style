import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleForm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2940&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-[2px]" />
      
      <div className={`
        relative w-full max-w-md bg-white/95 rounded-2xl shadow-2xl p-8 transform transition-all duration-500 ease-in-out
        ${isAnimating ? 'scale-90 opacity-0 rotate-3' : 'scale-100 opacity-100 rotate-0'}
        before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_0_100px_rgba(255,255,255,0.2)] before:z-0
      `}>
        <div className={`
          relative z-10 transition-all duration-500 ease-in-out transform
          ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}
        `}>
          <div className="text-center mb-8">
            <h1 className={`
              text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3
              transition-all duration-500 transform
              ${isAnimating ? 'scale-95 blur-sm' : 'scale-100 blur-0'}
            `}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="relative group transform transition-all duration-300 ease-in-out">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-gray-50/90"
                />
              </div>
            )}

            <div className={`
              relative group transform transition-all duration-300 ease-in-out
              ${isAnimating ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'}
            `}>
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-gray-50/90"
              />
            </div>

            <div className={`
              relative group transform transition-all duration-300 ease-in-out
              ${isAnimating ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'}
            `}>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-gray-50/90"
              />
            </div>

            {isLogin && (
              <div className="text-right transform transition-all duration-300 ease-in-out">
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700 transition-colors">
                  Forgot Password?
                </a>
              </div>
            )}

            <button className={`
              w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold 
              shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all 
              flex items-center justify-center gap-2 relative overflow-hidden group
              ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className={`
              relative my-8 transition-all duration-300 ease-in-out transform
              ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
            `}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button className={`
              w-full bg-[#24292F] hover:bg-[#2F3337] text-white py-3.5 px-4 rounded-xl font-medium 
              shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all 
              flex items-center justify-center gap-3 relative overflow-hidden group
              ${isAnimating ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Github size={22} className="relative z-10" />
              <span className="relative z-10 tracking-wide">Continue with GitHub</span>
            </button>
          </form>

          <p className={`
            text-center mt-8 text-gray-600 transition-all duration-300 ease-in-out transform
            ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
          `}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="ml-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;