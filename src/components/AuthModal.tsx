import React, { useState } from 'react';
import { X, Lock, Mail, User, Building, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup' | 'forgot';
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; role: string; organization: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'reset-sent'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Senior Technical Auditor');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'forgot') {
      if (!email || !email.includes('@')) {
        setError('Please enter a valid work email address.');
        return;
      }
      setMode('reset-sent');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid engineering work email.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'signup' && !name) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        name: name || (email.split('@')[0].toUpperCase()),
        email,
        role: role || 'Project Engineer',
        organization: organization || 'Infrastructure Audit Consortium',
      });
      onClose();
    }, 400);
  };

  const handleQuickDemoLogin = (roleType: 'auditor' | 'pm') => {
    if (roleType === 'auditor') {
      onSuccess({
        name: 'Er. Rajesh K. Varma',
        email: 'rajesh.varma@sitesight.ai',
        role: 'Senior Technical Auditor',
        organization: 'Independent Engineering Audit Services',
      });
    } else {
      onSuccess({
        name: 'Er. Sunita Rao, M.Tech',
        email: 'sunita.rao@prestigeconstructions.com',
        role: 'Chief Project Manager',
        organization: 'Prestige Estates Infrastructure',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-[#101A2C]">
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {mode === 'reset-sent' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#101A2C]">Password Reset Link Sent</h3>
              <p className="text-xs text-slate-600">
                We have dispatched a secure password reset link to <strong className="font-semibold text-slate-800">{email}</strong>. Please check your inbox and spam folder.
              </p>
              <button
                onClick={() => setMode('login')}
                className="w-full py-2.5 text-xs font-bold text-white bg-[#101A2C] rounded-md hover:bg-slate-800 transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#101A2C]">
                  {mode === 'login' && 'Sign In to SiteSight AI'}
                  {mode === 'signup' && 'Create Engineering Account'}
                  {mode === 'forgot' && 'Reset Engineering Credentials'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {mode === 'login' && 'Access certified project dossiers, vision logs, and timeline analysis.'}
                  {mode === 'signup' && 'Register your infrastructure team to begin continuous site monitoring.'}
                  {mode === 'forgot' && 'Enter your registered work email to receive password reset instructions.'}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Er. Rajesh K. Varma"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#FF8A32] focus:border-[#FF8A32]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="e.g. Brigade Enterprises Ltd"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#FF8A32] focus:border-[#FF8A32]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Engineering Role</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#FF8A32] focus:border-[#FF8A32] bg-white"
                      >
                        <option value="Senior Technical Auditor">Senior Technical Auditor</option>
                        <option value="Chief Project Manager">Chief Project Manager</option>
                        <option value="Site Structural Engineer">Site Structural Engineer</option>
                        <option value="Lender Representative">Lender / Bank Due-Diligence Representative</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="engineer@company.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#FF8A32] focus:border-[#FF8A32]"
                      required
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">Password</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[11px] text-[#FF8A32] hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#FF8A32] focus:border-[#FF8A32]"
                        required
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 text-xs font-bold text-white bg-[#FF8A32] hover:bg-[#e87a26] rounded-md transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Processing...'
                  ) : (
                    <>
                      <span>
                        {mode === 'login' && 'Sign In'}
                        {mode === 'signup' && 'Create Account'}
                        {mode === 'forgot' && 'Send Password Reset Email'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Mode Toggle */}
              <div className="mt-4 text-center text-xs text-slate-500">
                {mode === 'login' ? (
                  <span>
                    Don't have an engineering account?{' '}
                    <button
                      onClick={() => { setMode('signup'); setError(''); }}
                      className="text-[#FF8A32] font-semibold hover:underline"
                    >
                      Sign Up
                    </button>
                  </span>
                ) : (
                  <span>
                    Already registered?{' '}
                    <button
                      onClick={() => { setMode('login'); setError(''); }}
                      className="text-[#FF8A32] font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </div>

              {/* Instant Demo Login Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <span className="block text-[11px] font-semibold text-slate-500 mb-2.5 uppercase tracking-wider text-center">
                  Or Test with Demo Profiles
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('auditor')}
                    className="p-2 text-left rounded-md border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-xs transition-colors"
                  >
                    <span className="font-bold text-slate-900 block truncate">Er. Rajesh Varma</span>
                    <span className="text-[10px] text-slate-500 block truncate">Technical Auditor</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('pm')}
                    className="p-2 text-left rounded-md border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-xs transition-colors"
                  >
                    <span className="font-bold text-slate-900 block truncate">Er. Sunita Rao</span>
                    <span className="text-[10px] text-slate-500 block truncate">Project Manager</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
