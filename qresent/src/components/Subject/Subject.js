import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Subject.css";
import { database, auth } from "../../firebase";
import Popup from "../Popup/Popup";
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { Link } from "react-router-dom";
import AttendancePDF from "../AttendancePDF/AttendancePDF.js";
import { PDFDownloadLink } from '@react-pdf/renderer';
import EditProfile from "./EditProfile";
import { format } from "date-fns";

const GENERATE_QR_OPTION = "GenerateQR";
const STATISTICS_OPTION = "Statistics";
class Subject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCourse: {},
      email: "",
      isOpen: false,
      time: "",
      optionChosen: "",
      attendance: []
    }
  }

  togglePopupQr = (e, option) => {
    this.setState({ isOpen: !this.state.isOpen });
    this.setState({ time: Math.floor(new Date().getTime() / 1000) });
    this.setState({ optionChosen: option });
  }

  async componentDidMount() {
    const refs = database.ref('materii');
    const email = auth.currentUser.email;

    await refs.on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();

        if(childData.name === this.props.match.params.id) {
          this.setState({ currentCourse : childData, email: email });
          this.setState({materieKey : childSnapshot.key});
        }
      });
    });

    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      120000
    );

    this.exportAttendance();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateInfo() {
    database.ref('materii').child('-MnQPdcSCdce2rc9jtoj').update({'name': 'APD....'})
  }

  getParsedDate(strDate){
    var date = new Date(strDate);
    var formattedDate = format(date, "MMMM do yyyy");

    return formattedDate;
  }

  exportAttendance(){
    this.setState({attendance : []})
    database
      .ref('attendance/')
      .once('value')
      .then(snapshot => {
          snapshot.forEach((child) => {
              let dict = child.val()
              if (dict["course"] == this.state.currentCourse.name && this.getParsedDate(dict["time"]) == this.getParsedDate(new Date()).toString()){
                this.setState({attendance: this.state.attendance.concat(dict)})
              }
          });
      });

    return this.state.attendance;
  }

  edit_button = (key) => {
    const edit_button = document.getElementById(key);
    console.log(edit_button);
    const txt = document.getElementById(key + 'text');

    txt.contentEditable = true;
    txt.style.backgroundColor = "#dddbdb";
  }

  done_button = (key) => {
    const txt = document.getElementById(key + 'text');
    const done_button = document.getElementById(key + 'done');

    txt.contentEditable = false;
    txt.style.backgroundColor = "#ffe44d";

    database.ref('materii').child(this.state.materieKey).child('scores').update({[key]: txt.innerText});
  }

  render() {
    let keys;

    if(this.state.currentCourse.scores) {
      keys = Object.keys(this.state.currentCourse.scores);
    }
    
    return (
      <div className="container">
        <div className="container d-flex justify-content-center">
          <div className="row" id="descriptionSubject">
            <div className="col-md-8">
              <div className="row">
                <h3>Informatii generale pentru materia {this.state.currentCourse.name}</h3>
                <div>
                  {this.state.currentCourse.general_info}
                  {!CheckIfUserIsStudent(this.state.email) && <EditProfile></EditProfile>}
                </div>
              </div>

              <div className="row">
                <h3>Evaluare pe parcurs</h3>
                <div>
                  {!CheckIfUserIsStudent(this.state.email) &&
                    keys && 
                    keys.map(key => {
                        return <li className="list-element">
                              <span className="col-auto">{key}</span>
                              <span className="col-auto score-value" id={key + 'text'}>{this.state.currentCourse.scores[key]} </span> 
                              <Button className="col-auto subject-button" variant="dark" onClick={() => this.edit_button(key)} id={key}>Edit</Button>
                              <Button className="col-auto subject-button" variant="dark" onClick={() => this.done_button(key)} id={key + "done"}>Done</Button>
                          </li>
                    })
                  }
                  {CheckIfUserIsStudent(this.state.email) &&
                    keys && 
                    keys.map(key => {
                      return <li> {key}: {this.state.currentCourse.scores[key]} </li>
                    })
                  }
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <h3>Orar</h3> 
              <table>
                <tr>
                  <th>Zi</th>
                  <th>Interval</th>
                  <th>Asistent</th>
                  <th>Sala</th>
                </tr>
                {
                  this.state.currentCourse.schedule &&
                  this.state.currentCourse.schedule.map((element) => {
                    return <tr>
                        <td>{element["zi"]}</td>
                        <td>{element["interval"]}</td>
                        <td>{element["asistent"]}</td>
                        <td>{element["sala"]}</td>
                      </tr>
                  })
                  
                }
              </table>
            </div>
          </div>
        </div>

        <div className="container buttons-section">
          <div className="row">
            {CheckIfUserIsStudent(this.state.email) ?
                <Link style={{textDecoration: "none", color: "#ffffff", width: "50%"}} to={{pathname: `/scanqr`}}>
                  <Button className="col-md" variant="secondary">Scan QR code</Button>
                </Link>
              :
              <Button className="col-md" variant="secondary" onClick={(e) => this.togglePopupQr(e, GENERATE_QR_OPTION)}>
                { this.state.optionChosen == GENERATE_QR_OPTION && this.state.isOpen && (
                  <Popup 
                    handleClose={this.togglePopupQr} 
                    time={this.state.time} 
                    course={this.state.currentCourse.name}
                    button={GENERATE_QR_OPTION}/>
                )}
                Generate QR code
              </Button>
            }
            <Button className="col-md" variant="secondary" onClick={(e) => this.togglePopupQr(e, STATISTICS_OPTION)}>
                { this.state.optionChosen == STATISTICS_OPTION && this.state.isOpen && 
                  (
                    <Popup 
                      handleClose={this.togglePopupQr}
                      time={this.state.time} 
                      course={this.state.currentCourse.name} 
                      button={STATISTICS_OPTION}
                    />
                  )
                }
              Statistici prezenta
            </Button>
            {
              !CheckIfUserIsStudent(this.state.email) &&
                  <PDFDownloadLink 
                    document={<AttendancePDF data={this.state.attendance}/>} 
                    fileName="Prezenta.pdf" 
                    className="pdf-download" style={{width: "33%"}}>
                  {({ blob, url, loading, error }) =>
                    loading ? 
                    <Button className="col-md" variant="secondary" style={{width: "33%"}}>'Loading document...'</Button> : 
                    <Button className="col-md" variant="secondary">Exporta Lista</Button>
                  }
                  </PDFDownloadLink>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Subject;