import React from 'react';
import { database } from "../../firebase";
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Table = props => {
  const student = props.student;

  function changeUserStatus(disable) {
    let Refs = "";
    let entry = "";

    if(CheckIfUserIsStudent(props.student.email)) {
      Refs = database.ref('students');

      Refs.on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            if(childData.email === student.email) {
              entry = childSnapshot.key;
            }
        });
      });
      database.ref('/students').child(entry).update({'isActive': disable});
    } else {
      Refs = database.ref('professors');

      Refs.on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            if(childData.email === student.email) {
              entry = childSnapshot.key;
            }
        });
      });
      database.ref('/professors').child(entry).update({'isActive': disable});
    }

    window.location.reload(false);
  }

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
          {props.student.group ? <td>{props.student.group}</td> : ""}
          <td>
            <Link className="btn btn-outline-success mr-1 ml-1" to={{pathname: `/admin/${props.student.email}`, state: {student}}}>Edit</Link>
            {props.student.isActive === true ?
              <Button className="btn-outline-danger mr-1 ml-3"  variant="outline-danger" onClick={() => changeUserStatus(false)}>Disable user</Button>
              :
              <Button className="btn-outline-danger mr-1 ml-3"  variant="outline-danger" onClick={() => changeUserStatus(true)}>Enable user</Button>
            }
          </td>
        </tr> 
  );
}
  
export default Table;