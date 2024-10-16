const ranks = [
    { name: 'UniThrifter', percentile: 1 },
    { name: 'Pro Thrifter', percentile: 5 },
    { name: 'Expert Thrifter', percentile: 10 },
    { name: 'Proficient Thrifter', percentile: 20 },
    { name: 'Novice Thrifter', percentile: 40 },
    { name: 'Newbie Thrifter', percentile: 100 }
  ];
  
  export const calculateRank = (userPoints, totalUsers) => {
    const userPercentile = (userPoints / totalUsers) * 100;
    return ranks.find(rank => userPercentile <= rank.percentile);
  };