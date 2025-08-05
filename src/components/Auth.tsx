import React, { useState } from 'react';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';

interface AuthProps {
  onAuthStateChange: (isAuthenticated: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthStateChange }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signIn({ username, password });
      onAuthStateChange(true);
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onAuthStateChange(false);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Pickleball 365 Inventory</h2>
        <p>Please sign in to access the inventory system</p>
        
        <form onSubmit={handleSignIn}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth; 