import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

const Table = props => {
  const backUrl = props.student.name;
  console.log(props.student.courses);
  
  return(
      
       <tr>
        <th scope="row"> </th>
        <td>{props.student.name }</td>
        <td>{props.student.email}</td>
        <td>{props.student.courses && props.student.courses.map(curs => (
                <p>{curs}</p>)) }</td>
        <td>{props.student.group}</td>   
        <td> <a href="#" className="btn btn-outline-success">Edit</a></td>   
        </tr>
      
  );
}
  
export default Table;