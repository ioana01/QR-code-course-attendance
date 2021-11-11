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
    
    addToDB() {

        const student = {
            group: '344C5',
            name: 'Pirlog Patricia',
            email: 'patricia.pirlog@stud.acs.upb.ro',
            courses: ['MPS', 'ISI', 'EP', 'UBD']
        }

        //database.ref('students').push(student);

        // const professor = {
        //     name: 'Alexandru Boicea',
        //     email: 'alexandru.boicea@cs.pub.ro',
        //     courses: ['BD1', 'CAD/CASE']
        // }
        //database.ref('professors').push(professor); 
    }

    async componentDidMount() {
        let coursesList = [];
        const subjectsRefs = database.ref('materii');
        const userSubjects = database.ref();
        const email = auth.currentUser.email;

        if(CheckIfUserIsStudent(email)) {
        //if(email.endsWith("@stud.acs.upb.ro")) {
            let studentCoursesList = [];
            const studentRefs = database.ref('students');

            await studentRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                   // console.log(childData);
                    if(childData.email === email) {
                        console.log("aici");
                        studentCoursesList.push.apply(studentCoursesList, childData.courses);
                    }
                });
               // console.log(studentCoursesList);
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
            console.log("nu e student, ci profffff");
            let profCoursesList = [];
            const profRefs = database.ref('professors');

            await profRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                    if(childData.email === email) {
                        profCoursesList.push.apply(profCoursesList, childData.courses);  
                    }
                    console.log(profCoursesList);
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
            (
                this.state.courses.length &&
                <div>
                    <div className="container-fluid d-flex justify-content-center">
                        <div className="row" id="courses">
                            {this.state.courses.map(course => (
                                <div className="col-md-4">
                                    <Card imgsrc={img1} course={course}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default Dashboard;