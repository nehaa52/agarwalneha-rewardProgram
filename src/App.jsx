import React, { useEffect, useState } from 'react';
import { useLogger } from './utils/logger';
import UsersMonthlyRewards from './components/UserMonthlyRewards';
import TotalRewards from './components/TotalRewards';
import { filterLastThreeMonths } from './utils/helpers';
import AllTransaction from './components/AllTransaction';
import { fetchTransactions } from './services/api';
import './App.css';

export default function App() {
  const { logger } = useLogger();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updatedData = async () => {
      try {
        const data = await fetchTransactions(logger);
        const lastThreeMonthsData = filterLastThreeMonths(data);
        setData(lastThreeMonthsData);
        logger.info( 'App mounted' );
      } catch (err) {
        setError( 'Error fetching transactions' );
        logger.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    updatedData();
  }, []);

  if (loading) return <h3>Loading..</h3>;
  if (error) return <h3>ErrorMessage: {error}</h3>;

  return (
    <>
      <div className='tables-container'>
        <div className='table-wrapper'>
          <UsersMonthlyRewards data={data} />
        </div>
        <div className='table-wrapper'>
          <TotalRewards data={data} />
        </div>
      </div>
      <AllTransaction data={data} />
    </>
  );
}