import React from 'react';
import './styles/Table.css';

const MovesTable = ({ data }) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Learned at</th>
            <th>Learn method</th>
            <th>Version group</th>
            {/* <th>Max Chance</th>
            <th>Type</th> */}
          </tr>
        </thead>
        <tbody>
          { (data?.length > 0) ? data.map( (data, index) => {
             return (
              <tr key={ index }>
                <td>{ data.move.name }</td>
                <td>Level { data.version_group_details[0].level_learned_at }</td>
                <td>{ data.version_group_details[0].move_learn_method.name }</td>
                <td>{ data.version_group_details[0].version_group.name }</td>
                {/* <td>{ data.version_details[0].max_chance }</td>
                <td>{ data.version_details[0].version.name }</td> */}
              </tr>
            )
           }) : <tr><td colSpan="5" className="t-center">No data found</td></tr> }
        </tbody>
      </table>
    );
  }

export default MovesTable