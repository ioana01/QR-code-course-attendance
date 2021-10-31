import React from 'react';
import ReactDOM from 'react-dom';
import './Card.css';

const Card = props => {
  return(
    <div className="card text-center shadow">
      <div className="overflow">
        <img src={props.imgsrc} alt="Image 1" className='card-img-top'/>
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">{props.title}</h4>
        <p className="card-text text-secondary">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus rem, aliquam quos repellat odit quo ut consectetur odio dolor similique facere autem doloremque, consequuntur aperiam unde rerum dolore assumenda nesciunt.
        </p>
        <a href="#" className="btn btn-outline-success">Go Anywhere</a>
      </div>
    </div>
  );
}
  
export default Card;