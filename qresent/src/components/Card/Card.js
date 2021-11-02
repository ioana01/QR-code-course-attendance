import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import './Card.css';

const Card = props => {
  const backUrl = props.course.name;

  return(
    <div className="card text-center shadow">
      <div className="overflow">
        <img src={props.imgsrc} alt="Image 1" className='card-img-top'/>
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">{ props.course.name }</h4>
        <p className="card-text text-secondary">
          Titular curs: { props.course.professor }
        </p>
        {/* <a href="#" className="btn btn-outline-success">More info</a> */}
        <Link className="btn btn-outline-success" to={{pathname: `/subject/${props.course.name}`}}> More info </Link>
      </div>
    </div>
  );
}
  
export default Card;