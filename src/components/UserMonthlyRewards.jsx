import React from 'react';
import { calculatePointsPerTransaction } from '../utils/helpers';
import { toLocalDate } from '../utils/helpers';

function UsersMonthlyRewards(props) {
  return (
    <>
      <h3>
        {' '}
        {props.month} {props.year}
      </h3>
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
          {props.sortedDate.map((data) => {
            return (
              <tr key={data.transactionId}>
                <td>{data.customerId}</td>
                <td>{data.customerName}</td>
                <td>{data.transactionId}</td>
                <td>${data.amount}</td>
                <td>{toLocalDate(data)}</td>
                <td>{props.year}</td>
                <td>{calculatePointsPerTransaction(data)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default UsersMonthlyRewards;
