import React from 'react';
import { calculatePointsPerTransaction } from '../utils/helpers';
import { toLocalDate } from '../utils/helpers';
import { sortDataByDate } from '../utils/helpers';
import { useApi } from '../services/api';

function AllTransaction() {
  const { data, loading, error } = useApi();
  const sortedData = sortDataByDate(data);

  if (error) {
    return <h3>ErrorMessage: {error}</h3>;
  }
  if (loading) {
    return <h3>Loading..</h3>;
  }
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
                <td>{calculatePointsPerTransaction(data)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AllTransaction;
