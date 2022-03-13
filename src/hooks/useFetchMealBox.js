import { useState, useEffect } from 'react';
import mealBox from '../data/mealBox';

const useFetchMealBox = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mealBox);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [data]);

  return { data, loading };
};

export default useFetchMealBox;
