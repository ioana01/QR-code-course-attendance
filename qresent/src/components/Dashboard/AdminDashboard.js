import React, { Component} from 'react';
import Table from './Table.js';
import { database } from "../../firebase";
import { Link } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';

class AdminDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
            teachersList: []
        }
    }

    async componentDidMount() {
        let teachersNameList = [];
        const teachersRefs = database.ref('professors');
        let studentNameList = [];
        const studentRefs = database.ref('students');

        await studentRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                studentNameList.push(childData);
            });
            this.setState({ studentList : studentNameList});
        });

        await teachersRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                teachersNameList.push(childData);
            });
            this.setState({ teachersList : teachersNameList});
        }); 
    }

    render(){
        return (
            <> 
            <div className="container buttons-section users-management">
                    <div className="row">
                        <Link className="btn btn-outline-success col-md mr-5 ml-6" to={{pathname: "/addStudent"}}> Add student </Link>
                        <Link className="btn btn-outline-success col-md mr-5 ml-6" to={{pathname: "/addTeacher"}}> Add teacher </Link>
                    </div>
            </div>  
            <div className="container mt-5">
            <Tabs defaultActiveKey="students" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="students" title="Students">
                    {this.state.studentList.length &&
                        <table className="table" > 
                        <thead style={{backgroundColor: "rgba(33, 37, 41)", color: "white"}}>
                            <th></th>
                            <th scope="col">Nume</th>
                            <th scope="col">Email</th>
                            <th scope="col">Cursuri</th>
                            <th scope="col">Grupa</th>
                            <th scope="col">Operatii tabel</th>
                        </thead>
                        <tbody>
                            {
                                this.state.studentList.map(student => (
                                    <Table student={student}/>
                                ))
                            }
                        </tbody>
                        </table>
                    }
                </Tab>
                <Tab eventKey="teachers" title="Teachers">
                    {this.state.teachersList.length &&
                    
                    <table className="table" > 
                    <thead style={{backgroundColor: "rgba(33, 37, 41)", color: "white"}}>
                        <th></th>
                        <th scope="col">Nume</th>
                        <th scope="col">Email</th>
                        <th scope="col">Cursuri</th>
                        <th scope="col">Operatii tabel</th>
                    </thead>
                    <tbody>
                        {
                            this.state.teachersList.map(student => (
                                <Table student={student}/>
                            ))
                        }
                    </tbody>
                    </table>
                }
                </Tab>
            </Tabs>
            </div>
            </>
        );
    }
}

export default AdminDashboard;