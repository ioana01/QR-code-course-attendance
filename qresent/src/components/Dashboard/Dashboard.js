import React, { Component} from 'react';
import Card from '../Card/Card';
import img1 from './react-logo.png';
import { database } from "../../firebase";

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    addToDB() {
        const mate = {
            name: 'Matematica 2',
            professor: 'Adriana Balan',
            general_info: '...',
            scores: 'curs, lab, teme',
            schedule: '...'
        }
        // database.ref('materii').push(mate);

        const student = {
            group: '344C5',
            name: 'Pirlog Patricia',
            email: 'patricia.pirlog@stud.acs.upb.ro',
            courses: ['MPS', 'ISI', 'EP', 'UBD']
        }
        // database.ref('students').push(student);

        const professor = {
            name: 'Alexandru Boicea',
            email: 'alexandru.boicea@cs.pub.ro',
            courses: ['BD1', 'CAD/CASE']
        }
        database.ref('professors').push(professor); 
    }

    async componentDidMount() {
        let coursesList = [];
        const refs = database.ref('materii');

        await refs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                console.log(childData);
                coursesList.push(childData);
            });
            this.setState({ courses : coursesList });
        });

        console.log(this.state.courses);
    }

    render(){
        return(
            (
                this.state.courses.length &&
            <div>
                {/* <button onClick={this.addToDB}>Apasa-ma!</button> */}
                <div className="container-fluid d-flex justify-content-center">
                    <div className="row">
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