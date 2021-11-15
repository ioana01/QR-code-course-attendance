import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

const Table = props => {
  const backUrl = props.student.name;
  const student = props.student;
  console.log(props.student.courses);
  
  return(
       <tr>
          <th scope="row"> </th>
          <td>{props.student.name}</td>
          <td>{props.student.email}</td>
          <td>{props.student.courses && props.student.courses.map(curs => (
                  <p>{curs}</p>)) }</td>
          <td>{props.student.group}</td>   
          {/* <td> <a href="#" className="btn btn-outline-success">Edit</a></td>    */}
          {/* <Link className="btn btn-outline-success" to={{pathname: `/subject/${props.course.name}`}}> More info </Link> */}
          {/* aici trb si un id de user*/}
          {/* <Link to={{pathname: '/tylermcginnis', state: {fromNotifications: true}}}>Tyler McGinnis</Link> */}
          <Link className="btn btn-outline-success" to={{pathname: `/admin/${props.student.email}`, state: {student}}}>Edit</Link>
        </tr> 
  );
}
  
export default Table;