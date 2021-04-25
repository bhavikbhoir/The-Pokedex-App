import React from 'react';
import './styles/Table.css';

const StatsTable = ({ data }) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Base value</th>
            <th>Effort</th>
            <th>Stat name</th>
          </tr>
        </thead>
        <tbody>
          { (data?.length > 0) ? data.map( (data, index) => {
             return (
              <tr key={ index }>
                <td>{ data.base_stat }</td>
                <td>Level { data.effort }</td>
                <td>{ data.stat.name }</td>
              </tr>
            )
           }) : <tr><td colSpan="5" className="t-center">No data found</td></tr> }
        </tbody>
      </table>
    );
  }

export default StatsTable