import React, { Component} from 'react';
import Table from './Table.js';
import { database, auth } from "../../firebase";

class AdminDashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            studentList: []
        }
    }
    async componentDidMount() {
        let studentNameList = [];
        const studentRefs = database.ref('students');
        
        await studentRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                studentNameList.push(childData);
            });
            this.setState({ studentList : studentNameList});
        });
        
        
    }

    render(){
        return(    this.state.studentList.length &&
            <div className="container mt-5">
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
                        {this.state.studentList.map(student => (
                                <Table student={student}/>
                        ))}
                    </tbody>
                    </table>
                
            </div>);
    }
}

export default AdminDashboard;