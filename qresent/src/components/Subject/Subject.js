import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Subject.css";
import { database, auth } from "../../firebase";
import ScanQr from '../ScanQR/ScanQr';
import GenerateQr from "../GenerateQR/GenerateQR";
import Popup from "../Popup/Popup";
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { Link } from "react-router-dom";

class Subject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCourse: {},
      email: "",
      isOpen: false
    }
  }

  togglePopupQr = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  async componentDidMount() {
    const refs = database.ref('materii');
    const email = auth.currentUser.email;

    await refs.on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();
        if(childData.name === this.props.match.params.id) {
          this.setState({ currentCourse : childData, email: email });
        }
      });
    });

    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      30000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
        <div className="container buttons-section">
          <div className="row">
            {(() => {
              if (CheckIfUserIsStudent(this.state.email)) {
                return (
                  <Button className="col-md" variant="secondary">
                    <Link style={{textDecoration: "none", color: "#ffffff"}} to={{pathname: `/scanqr`}}>
                      Scan QR code
                    </Link>
                  </Button>
                )
              } else {
                return (
                  <Button className="col-md" variant="secondary" onClick={this.togglePopupQr}>
                    {this.state.isOpen && (
                      <Popup content={GenerateQr()} handleClose={this.togglePopupQr}/>
                    )}
                    Generate QR code
                  </Button>
                )
              }
            })()}
            <Button className="col-md" variant="secondary">
              Statistici prezenta
            </Button>
            <Button className="col-md" variant="secondary">
              Exporta lista
            </Button>
          </div>
        </div>

      </div>
    );
  }
}

export default Subject;
