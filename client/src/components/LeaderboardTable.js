import React from 'react';

const LeaderboardTable = ({ leaderboard }) => {
  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;