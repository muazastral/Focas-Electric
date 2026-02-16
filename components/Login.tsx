import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Zap, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface LoginProps {
  onNavigate: (page: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        // Redirect logic handled in useEffect or via immediate check, but since we are in a SPA flow:
        // Checking role in context might be delayed slightly, so we rely on the component re-render or explicit logic
        // But for simplicity in this flow, we check mock data or wait for context update
        // We will just navigate to 'home' and let the Navbar update, or navigate based on role if we could inspect result
        // For better UX, we'll let the user decide or auto-redirect.
        if (email.includes('admin')) {
             onNavigate('admin');
        } else {
             onNavigate('user-dashboard');
        }
      } else {
        setError('Invalid email or password. (Hint: Try admin@focus.com / password)');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 mb-4">
            <Zap className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Sign in to access your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                placeholder="you@example.com"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <button className="font-medium text-red-600 dark:text-red-400 hover:underline">
            Create Account
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-center text-slate-400">
          <p>Demo Credentials:</p>
          <p>Admin: admin@focus.com / password</p>
          <p>User: user@gmail.com / password</p>
        </div>

      </div>
    </div>
  );
};