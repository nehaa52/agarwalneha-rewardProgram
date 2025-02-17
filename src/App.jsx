import React, { useEffect, useState } from 'react';
import { useLogger } from './utils/logger';
import UsersMonthlyRewards from './components/UserMonthlyRewards';
import TotalRewards from './components/TotalRewards';
import {calculatePointsPerTransaction, filterLastThreeMonths} from './utils/helpers';
import AllTransaction from './components/AllTransaction';
import { fetchTransactions } from './services/api';
import './App.css';

export default function App() {
  const { logs, logger } = useLogger();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updatedData = async () => {
      try {
        const data = await fetchTransactions();
        const lastThreeMonthsData = filterLastThreeMonths(data); 
        const finalData = lastThreeMonthsData.map( data => ({
          ...data,
          points: calculatePointsPerTransaction(data)
        }))// Adding the rewards points earned per transaction according to the price
        setData(finalData);
        logger.info('App mounted');
      } catch (err) {
        setError(err.message);
        logger.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    updatedData();
  }, []);

  if (loading) return <h3>Loading..</h3>;
  if (error) return <h3>ErrorMessage: {error}</h3>;

  console.log(logs);

  return (
    <>
      <UsersMonthlyRewards data={data} />
      <TotalRewards data={data} />
      <AllTransaction data={data} />
    </>
  );
}