import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, user, logout } = useAuth();
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  // Auto-redirect after login based on role
  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
    // eslint-disable-next-line
  }, [user]);

  const handleLogin = () => {
    login(userId);
    // Routing will be handled in useEffect after user state is updated
  };

  const doLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as {user.name}</p>
          <button onClick={doLogout}>Logout</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter user id (u1 or u2)"
            value={userId}
            onChange={e => setUserId(e.target.value.trim())}
          />
          <button onClick={handleLogin} disabled={!userId}>
            Login
          </button>
        </>
      )}
    </div>
  );
};
export default Login;
