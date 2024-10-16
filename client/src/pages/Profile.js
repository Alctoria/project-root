import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePoints } from '../hooks/usePoints';

const Profile = () => {
  const { user } = useAuth();
  const { points } = usePoints(user.uid);

  return (
    <div className="profile">
      <h1>Profile</h1>
      <img src={user.photoURL} alt={user.displayName} />
      <h2>{user.displayName}</h2>
      <p>Email: {user.email}</p>
      <p>Points: {points}</p>
    </div>
  );
};

export default Profile;