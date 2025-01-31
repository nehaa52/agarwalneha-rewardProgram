import React from 'react';
import {
  getMonthYear,
  filterDataByMonth,
  sortDataByDate,
} from '../utils/helpers';
import { useApi } from '../services/api';
import UsersMonthlyRewards from './UserMonthlyRewards';

export function CombineUsers() {
  const { data, loading, error } = useApi();
  const sortedDate = sortDataByDate(data);
  const { latest, secondlatest, thirdlatest } = getMonthYear(sortedDate);
  const latestData = filterDataByMonth(
    sortedDate,
    latest.monthIndex,
    latest.year
  );
  const secondLatestData = filterDataByMonth(
    sortedDate,
    secondlatest.monthIndex,
    secondlatest.year
  );
  const thirdLatestData = filterDataByMonth(
    sortedDate,
    thirdlatest.monthIndex,
    thirdlatest.year
  );

  if (error) {
    return <h3>ErrorMessage : {error}</h3>;
  }
  if (loading) {
    return <h3>Loading..</h3>;
  }

  return (
    <>
      <h2>User Monthly Rewards</h2>
      <UsersMonthlyRewards
        sortedDate={thirdLatestData}
        month={thirdlatest.month}
        year={thirdlatest.year}
      />
      <UsersMonthlyRewards
        sortedDate={secondLatestData}
        month={secondlatest.month}
        year={secondlatest.year}
      />
      <UsersMonthlyRewards
        sortedDate={latestData}
        month={latest.month}
        year={latest.year}
      />
    </>
  );
}

export default CombineUsers;
