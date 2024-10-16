import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <img src="/logo.png" alt="UniThrift Logo" />
      <nav>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {user && (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
      <Link to="/post-item" className="post-item-button">Post Item</Link>
    </header>
  );
};

export default Header;