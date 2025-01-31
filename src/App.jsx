import React from 'react';
import { useEffect } from 'react';
import { useLogger } from './utils/logger';
import CombineUsers from './components/CombineUsers';
import TotalRewards from './components/TotalRewards';
import AllTransaction from './components/AllTransaction';
// import './App.css';

export default function App() {
  const { logs, logger } = useLogger();
  useEffect(() => {
    try {
      logger.info('App mounted');
    } catch (error) {
      logger.error(error.message);
    }
  }, []);

  console.log(logs);

  return (
    <>
      <CombineUsers />
      <TotalRewards />
      <AllTransaction />
    </>
  );
}
