import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  LockKeyhole 
} from 'lucide-react';
import { motion } from 'motion/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled in the Firebase Console. Please enable it to continue.');
      } else {
        setError(err.message || 'Failed to sign in');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary-container/20 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[30%] h-[30%] rounded-full bg-tertiary-container/20 blur-[100px]"></div>
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-6 flex items-center justify-center w-16 h-16 bg-primary rounded-lg shadow-xl shadow-primary/20">
            <Building2 className="text-on-primary" size={36} />
          </div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight text-center font-headline">
            The Architectural Ledger
          </h1>
          <p className="text-secondary mt-2 text-sm tracking-wide font-bold uppercase">
            ENTERPRISE ADMINISTRATION PORTAL
          </p>
        </div>

        {/* Card Section */}
        <div className="bg-surface-container-lowest shadow-[0_32px_64px_-12px_rgba(42,52,57,0.06)] rounded-lg p-8 md:p-12 border-t-4 border-primary">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-on-background mb-2 font-headline">Welcome Back</h2>
            <p className="text-on-surface-variant text-sm">Please enter your credentials to access the ledger.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface uppercase tracking-widest flex items-center gap-2" htmlFor="email">
                <Mail size={14} />
                Professional Email
              </label>
              <input 
                className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-colors text-on-background placeholder:text-outline/50 font-medium" 
                id="email" 
                name="email" 
                placeholder="name@company.com" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-on-surface uppercase tracking-widest flex items-center gap-2" htmlFor="password">
                  <Lock size={14} />
                  Secure Password
                </label>
                <a className="text-xs font-semibold text-primary hover:text-primary-dim transition-colors" href="#">Forgot Password?</a>
              </div>
              <div className="relative">
                <input 
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-colors text-on-background placeholder:text-outline/50 font-medium" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-3 pt-2">
              <input 
                className="h-4 w-4 rounded-sm border-2 border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface-container-lowest transition-all cursor-pointer" 
                id="remember" 
                name="remember" 
                type="checkbox" 
              />
              <label className="text-sm font-medium text-on-surface-variant cursor-pointer select-none" htmlFor="remember">
                Stay logged in for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button 
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-dim active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign Into Portal'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-bold hover:text-primary-dim transition-colors">
                Register
              </Link>
            </p>
          </div>

          {/* Bottom Info */}
          <div className="mt-10 pt-8 border-t border-surface-container flex flex-col items-center gap-4">
            <p className="text-xs text-on-surface-variant text-center leading-relaxed">
              Access restricted to authorized personnel. <br/>
              All activity is logged under the security protocol.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-outline uppercase tracking-tighter">
                <ShieldCheck size={14} />
                SSL Encrypted
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-outline uppercase tracking-tighter">
                <LockKeyhole size={14} />
                Tier 4 Security
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-end px-2 opacity-60">
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
            System v4.8.2
          </div>
          <div className="text-[10px] font-medium text-on-surface-variant flex gap-4">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Support</a>
          </div>
        </div>
      </motion.main>

      {/* Side Image Ornament (Visible on desktop only) */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 max-w-[200px]">
        <div className="space-y-4">
          <div className="h-1 w-12 bg-primary"></div>
          <div className="text-sm font-headline font-extrabold text-primary-dim uppercase tracking-widest leading-tight">
            Architectural <br/> Precision in <br/> Human Capital.
          </div>
          <p className="text-xs text-secondary leading-relaxed font-medium">
            Optimizing the flow of enterprise data through sophisticated ledger structures and real-time analytics.
          </p>
        </div>
      </div>

      {/* Right Side Floating Background Card */}
      <div className="hidden xl:block absolute right-[-100px] top-[15%] w-[400px] aspect-[4/5] bg-surface-container-high rounded-lg rotate-6 opacity-30 pointer-events-none">
        <img 
          alt="Architectural context" 
          className="w-full h-full object-cover rounded-lg mix-blend-multiply grayscale" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4paOBTyA7GcVDZgvVTD9UuFtle2mUT6f59vq1R_uTqAzkX0Jj6DQXqrr3hYc_2TT6FeFknnFBjIMwMBI6nsBUuSFPp5kCQ5Vo50h0Fy310FMRNLnkpjKcTW_91ySBNUGeM7DgfiKRZH28DeC1gUJKkDwkdErNevwbc039J7jQkbhdHoN7EZgta41XD62-xsvIr3QnGAEiuOIAt--36yZOXB06lQgFz0gaK1_I4phnKqmVTD43bYSMPqpStRWxWFy8r1suFv4ansGC"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
