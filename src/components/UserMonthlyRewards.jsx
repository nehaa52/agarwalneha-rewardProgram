import React from 'react';
import { sortDataByDate, aggregateMonthly } from '../utils/helpers';

function UsersMonthlyRewards({ data }) {
  const sortedData = sortDataByDate(data);
  const agregateMonthsData = aggregateMonthly(sortedData);

  return (
    <>
      <h2>User Monthly Rewards</h2>
      {agregateMonthsData.map(({ monthYear, transactions }) => (
        <div key={monthYear}>
          <h3>{monthYear}</h3>
          <table id="customers">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Transaction ID</th>
                <th>Price</th>
                <th>Transaction Date</th>
                <th>Transaction Year</th>
                <th>Reward Points</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((data) => {
                return (
                  <tr key={data.transactionId}>
                    <td>{data.customerId}</td>
                    <td>{data.customerName}</td>
                    <td>{data.transactionId}</td>
                    <td>${data.amount}</td>
                    <td>{data.transactionDate}</td>
                    <td>{data.transactionYear}</td>
                    <td>{data.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}

export default UsersMonthlyRewards;