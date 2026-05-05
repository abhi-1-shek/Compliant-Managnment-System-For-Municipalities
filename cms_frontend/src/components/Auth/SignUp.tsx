import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type Role = 'CITIZEN' | 'STAFF';

interface SignUpProps {
  onToggleMode: () => void;
}

export function SignUp({ onToggleMode }: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<Role>('CITIZEN');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    const { error } = await signUp({
      email,
      password,
      name: fullName,
      role,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app">
        <div className="bg-glass rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl btn-primary shadow-md">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Account Created
          </h2>
          <p className="text-gray-600 mb-6">
            You can now sign in using your credentials.
          </p>

          <button
            onClick={onToggleMode}
            className="w-full py-3 rounded-xl btn-primary"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-app">
      <div className="bg-glass rounded-3xl shadow-xl p-8 w-full max-w-md">
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
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full px-4 py-3 rounded-xl border"
          >
            <option value="CITIZEN">Citizen</option>
            <option value="STAFF">Staff</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl btn-primary disabled:opacity-60"
          >
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onToggleMode}
            className="text-sm font-medium text-[color:var(--pastel-accent)] hover:underline"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
