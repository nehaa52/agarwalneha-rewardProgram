import React from 'react';
import { filterDataByName } from '../utils/helpers';

const TotalRewards = ({ data }) => {
  const filteredData = filterDataByName(data);

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
              <tr key={data.customerName}>
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