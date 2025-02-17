import React from 'react';
import {
  sortDataByDate,
  toLocalDate,
} from '../utils/helpers';

function AllTransaction({ data }) {
  const sortedData = sortDataByDate(data);

  return (
    <>
      <h2>All Transactions</h2>
      <table id="customers">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Transaction Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((data) => {
            return (
              <tr key={data.transactionId}>
                <td>{data.transactionId}</td>
                <td>{data.customerName}</td>
                <td>{toLocalDate(data)}</td>
                <td>{data.productPurchased}</td>
                <td>${data.amount}</td>
                <td>{data.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AllTransaction;