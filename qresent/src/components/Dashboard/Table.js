import React from 'react';
import { Link } from "react-router-dom";

const Table = props => {
  const student = props.student;
  
  return(
       <tr>
          <th scope="row"> </th>
          <td>{props.student.name}</td>
          <td>{props.student.email}</td>
          <td>
            {
              props.student.courses && props.student.courses.map(curs => (
                <p>{curs}</p>)) 
            }
          </td>
          <td>{props.student.group}</td>   
          
          <Link className="btn btn-outline-success" to={{pathname: `/admin/${props.student.email}`, state: {student}}}>Edit</Link>
        </tr> 
  );
}
  
export default Table;