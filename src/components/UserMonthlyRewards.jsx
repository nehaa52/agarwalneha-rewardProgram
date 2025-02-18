import React from 'react';
import { sortDataByDate, aggregateMonthly } from '../utils/helpers';

function UsersMonthlyRewards({ data }) {
  const sortedData = sortDataByDate(data);
  const agregateMonthsData = aggregateMonthly(sortedData);

  return (
    <>
      <h2>User Monthly Rewards</h2>
      <table id="customers">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Transaction Month</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {agregateMonthsData.map(({ monthYear, transactions }) =>
            transactions.map((data) => (
              <tr key={`${data.customerId} - ${monthYear}`}>
                <td>{data.customerId}</td>
                <td>{data.customerName}</td>
                <td>{data.monthYear}</td>
                <td>{data.totalPoints}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default UsersMonthlyRewards;