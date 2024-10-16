import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LeaderboardTable from '../components/LeaderboardTable';

const Leaderboard = () => {
  const [leaderboardType, setLeaderboardType] = useState('weekly');
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, [leaderboardType]);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await api.get(`/users/leaderboard?type=${leaderboardType}`);
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <select onChange={(e) => setLeaderboardType(e.target.value)}>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="alltime">All-time</option>
      </select>
      <LeaderboardTable leaderboard={leaderboardData} />
    </div>
  );
};

export default Leaderboard;