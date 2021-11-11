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
                //console.log(childData.name);
                studentNameList.push(childData);
            });
            this.setState({ studentList : studentNameList});
        });
        
        
    }

    render(){
        return(    this.state.studentList.length &&
            <div>
                    <table class="table">
                    <thead>
                        <th scope="col">#</th>
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