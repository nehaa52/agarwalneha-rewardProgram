import React from 'react';
import { useApi } from '../services/api';
import { filterDataByName } from '../utils/helpers';

const TotalRewards = () => {
  const { data, loading, error } = useApi();
  const filteredData = filterDataByName(data);

  if (error) {
    return <h3>ErrorMessage : {error}</h3>;
  }
  if (loading) {
    return <h3>Loading..</h3>;
  }

  return (
    <>
      <h2>Total Rewards</h2>
      <table id="customers">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((data) => {
            return (
              <tr key={data.transactionId}>
                <td>{data.customerName}</td>
                <td>{data.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TotalRewards;
