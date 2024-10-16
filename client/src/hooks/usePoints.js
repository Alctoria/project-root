import { useState, useEffect } from 'react';
import api from '../services/api';

export const usePoints = (userId) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { data } = await api.get(`/users/${userId}/points`);
        setPoints(data.points);
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchPoints();
  }, [userId]);

  const addPoints = async (amount) => {
    try {
      const { data } = await api.put(`/users/${userId}/points`, { points: amount });
      setPoints(data.points);
    } catch (error) {
      console.error('Error adding points:', error);
    }
  };

  return { points, addPoints };
};