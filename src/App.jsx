import React, { useEffect, useState } from 'react';
import { useLogger } from './utils/logger';
import UsersMonthlyRewards from './components/UserMonthlyRewards';
import TotalRewards from './components/TotalRewards';
import AllTransaction from './components/AllTransaction';
import { fetchTransactions } from './services/api';
import './App.css';

export default function App() {
  const { logs, logger } = useLogger();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const finaldata = async () => {
      try {
        setData(await fetchTransactions());
        logger.info('App mounted');
      } catch (err) {
        setError(err.message);
        logger.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    finaldata();
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