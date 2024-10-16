import React from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginModal = () => {
  const { login } = useAuth();

  return (
    <div className="login-modal">
      <h2>Login to UniThrift</h2>
      <button onClick={login}>Login with Google</button>
    </div>
  );
};

export default LoginModal;