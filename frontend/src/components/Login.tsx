import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('admin@store.com');
  const [password, setPassword] = useState<string>('123456');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
    // Your login logic here
    console.log('Logging in with:', { email, password });
  };

  return (
    <div id="login" className="page fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div className="fade-in w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your POS account</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className=" text-xs font-medium text-gray-600 block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm"
            />
          </div>
          <div className="pt-1">
            <button
              onClick={handleLogin}
              className="btn-primary bg-black text-white w-full py-2.5 rounded-xl text-sm font-medium"
            >
              Sign in
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Demo: Click Sign in with any credentials
        </p>
      </div>
    </div>
  );
};

export default Login;