import React, { Component} from 'react';
import Card from '../Card/Card';
import img1 from './react-logo.png';
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import { database, auth } from "../../firebase";
import './Dashboard.css'

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    async componentDidMount() {
        let coursesList = [];
        const subjectsRefs = database.ref('materii');
        const email = auth.currentUser.email;

        if(CheckIfUserIsStudent(email)) {
            let studentCoursesList = [];
            const studentRefs = database.ref('students');

            await studentRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();

                    if(childData.email === email) {
                        studentCoursesList.push.apply(studentCoursesList, childData.courses);
                    }
                });
            });

            await subjectsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const nume = childData.name;

                    if(studentCoursesList.includes(nume)) {
                        coursesList.push(childData);
                    }
                });

                this.setState({ courses : coursesList });
            });
        } else {
            let profCoursesList = [];
            const profRefs = database.ref('professors');

            await profRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();

                    if(childData.email === email) {
                        profCoursesList.push.apply(profCoursesList, childData.courses);  
                    }
                });
            });
            await subjectsRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    const nume = childData.name;

                    if(profCoursesList.includes(nume)) {
                        coursesList.push(childData);
                    } 
                });

                this.setState({ courses : coursesList });
            });
        }
    }

    render(){
        return(
            <div>
                {
                    this.state.courses.length ? 
                    (<div>
                        <div className="container-fluid d-flex justify-content-center">
                            <div className="row" id="courses">
                                {
                                    this.state.courses.map(course => (
                                        <div className="col-md-4">
                                            <Card imgsrc={img1} course={course}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>)
                    :     
                    (<div className="card text-center shadow">
                        <div className="card-body text-dark">
                            <h4 className="card-title">Nu sunteti inrolat inca la niciun curs</h4>
                            <p className="card-text text-secondary">
                                Va rugam reveniti mai tarziu
                            </p>
                        </div>
                    </div>)
                }
            </div>
        );
    }
}

export default Dashboard;