import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "./Subject.css";
import { database } from "../../firebase";
import ScanQr from '../ScanQR/ScanQr';
import { Link } from "react-router-dom";

class Subject extends Component {
    constructor(props) {
      super(props);

      this.state = {
        currentCourse: {}
      }
    }

    async componentDidMount() {
      const refs = database.ref('materii');

      await refs.on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
              const childData = childSnapshot.val();
              if(childData.name === this.props.match.params.id) {
                this.setState({ currentCourse : childData });
              }
          });
      });
    }

  render() {
    return (
      <div className="container">
        <div className="container d-flex justify-content-center">
          <div className="row" id="descriptionSubject">
            <div className="col-md-8">
              <div className="row">
                <h3>Informatii generale pentru materia {this.state.currentCourse.name}</h3>
                <div>
                  {this.state.currentCourse.general_info}
                </div>
              </div>
              <div className="row">
                <h3>Evaluare pe parcurs</h3>
                <div>
                  {this.state.currentCourse.scores}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <h3>Orar</h3>
              <div>
                {this.state.currentCourse.schedule}
              </div>
            </div>
          </div>
        </div>
        <div class="container buttons-section">
          <div class="row">
            <Button className="col-md" variant="secondary">
              Genereaza cod QR
            </Button>
            <Button className="col-md" variant="secondary">
              Statistici prezenta
            </Button>
            <Button className="col-md" variant="secondary">
              Exporta lista
            </Button>
          </div>
        </div>
        <Link className="btn btn-outline-success" to={{pathname: `/scanqr`}}> Scan QR Code </Link>
      </div>
    );
  }
}

export default Subject;
