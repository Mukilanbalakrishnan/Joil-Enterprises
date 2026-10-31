import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Shield, ArrowRight, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Button } from '../../components/ui/Button';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useStore();

  const [email, setEmail] = useState('admin@joli.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide demonstration credentials.');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid demonstration credentials.');
    }
  };

  const handleQuickDemoLogin = () => {
    login('admin@joli.com', 'admin123');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-center items-center p-4">
      {/* Back to Site link */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center text-xs">
        <Link
          to="/"
          className="text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1.5 uppercase tracking-wider font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
        </Link>
        <span className="text-neutral-400 uppercase tracking-widest text-[10px]">
          Demo Environment
        </span>
      </div>

      <div className="bg-white border border-neutral-200/90 rounded-sm p-8 max-w-md w-full shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2 border-b border-neutral-100 pb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-neutral-900 text-white mb-2">
            <Shield className="w-6 h-6 text-[#C27838]" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="font-extrabold tracking-[0.2em] text-lg uppercase text-neutral-950">
              Joli
            </span>
            <span className="font-light tracking-[0.2em] text-xs uppercase text-neutral-500">
              Admin Portal
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            Sign in to access the product catalogue and category management suite.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xs text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@joli.com"
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
                required
              />
            </div>
          </div>

          {/* Password with Toggle */}
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-700">
              Access Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 bg-white border border-neutral-200 rounded-xs text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Admin
            </Button>

            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2 px-3 text-xs uppercase tracking-wider text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-xs transition-colors font-medium cursor-pointer"
            >
              One-Click Demo Sign In (admin@joli.com)
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-neutral-100 text-[11px] text-neutral-400 text-center">
          Frontend Demonstration Mode — No server-side authentication required.
        </div>
      </div>
    </div>
  );
};

