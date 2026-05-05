import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginProps {
  onToggleMode: () => void;
}

export function Login({ onToggleMode }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app relative overflow-hidden">

      
      <div className="absolute -top-32 -left-32 w-96 h-96 blob-light opacity-50 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 blob-primary opacity-50 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-glass rounded-3xl shadow-xl p-8">

          
        
        <div className="flex justify-center mb-6">
  <div className="w-24 h-24 rounded-full bg-white shadow-xl overflow-hidden flex items-center justify-center">
    <img
      src="/logo.png"
      alt="CMS Logo"
      className="w-full h-full object-cover"
    />
  </div>
</div>




          
          <h1 className="text-3xl font-extrabold text-gray-800 text-center">
            CMS Portal
          </h1>
          <p className="text-gray-600 text-center mt-2 mb-8">
            Municipal Complaint Management System
          </p>

          
          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl
                           focus-pastel transition"
              />
              <label
                className="absolute left-4 top-3 text-gray-500 text-sm transition-all
                           peer-placeholder-shown:top-3.5
                           peer-placeholder-shown:text-base
                           peer-focus:top-1
                           peer-focus:text-xs
                           peer-focus:text-[color:var(--pastel-accent)]"
              >
                Email Address
              </label>
            </div>

            
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl
                           focus-pastel transition"
              />
              <label
                className="absolute left-4 top-3 text-gray-500 text-sm transition-all
                           peer-placeholder-shown:top-3.5
                           peer-placeholder-shown:text-base
                           peer-focus:top-1
                           peer-focus:text-xs
                           peer-focus:text-[color:var(--pastel-accent)]"
              >
                Password
              </label>
            </div>

            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl btn-primary
                         hover:shadow-lg hover:scale-[1.02]
                         transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

            
          <div className="mt-6 text-center">
            <button
              onClick={onToggleMode}
              className="text-sm font-medium text-[color:var(--pastel-accent)] hover:underline"
            >
              Don’t have an account? Sign up
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
