import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginModal from '../components/LoginModal';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/marketplace');
    }
  }, [user, navigate]);

  return (
    <div className="home">
      <h1>Welcome to UniThrift</h1>
      <p>The marketplace for college students</p>
      <LoginModal />
    </div>
  );
};

export default Home;