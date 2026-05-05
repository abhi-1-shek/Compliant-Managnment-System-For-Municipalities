import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Auth/Login';
import { SignUp } from './components/Auth/SignUp';
import { AdminDashboard } from './components/Dashboards/Admin/AdminDashboard';
import { StaffDashboard } from './components/Dashboards/Staff/StaffDashboard';
import { CitizenDashboard } from './components/Dashboards/Citizen/CitizenDashboard';

function AppContent() {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login' ? (
      <Login onToggleMode={() => setAuthMode('signup')} />
    ) : (
      <SignUp onToggleMode={() => setAuthMode('login')} />
    );
  }

  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'STAFF':
      return <StaffDashboard/>;
    case 'CITIZEN':
      return <CitizenDashboard/>;
  } 
} 

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
