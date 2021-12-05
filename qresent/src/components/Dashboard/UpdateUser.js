import React, { Component } from 'react';
import { database } from "../../firebase";
import { Button } from "react-bootstrap";
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard.js';
import {CheckIfUserIsStudent} from './../../utils/utils.js';

class UpdateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: props.location.state.student,
            subjectsList: [],
            studentEntry: "",
            options:  props.location.state.student.courses ? props.location.state.student.courses.map(course => ({
                            "value": course, "label": course
                        })) : [],
            courses: props.location.state.student.courses
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(selectedOptions) {
        this.setState({courses: selectedOptions.map(option => option.value)});
    }

    handleSubmit() {
        if(CheckIfUserIsStudent(this.state.student.email)) {
            database.ref('/students').child(this.state.studentEntry).update({'courses': this.state.courses});
        } else {
            database.ref('/professors').child(this.state.studentEntry).update({'courses': this.state.courses});
        }
        
        withRouter(AdminDashboard);
        const {history} = this.props;
        history.push("/admin");
    }

    componentDidMount() {
        let subjectsNameList = [];
        const subjectsRefs = database.ref('materii');
        const studentRefs = database.ref('students');
        const teachersRefs = database.ref('professors');

        subjectsRefs.on('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                const childData = childSnapshot.val();
                subjectsNameList.push(childData.name);
            });

            this.setState({ subjectsList : subjectsNameList});
        });
        if(CheckIfUserIsStudent(this.state.student.email)) {
            studentRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                        
                    if(childData.email === this.state.student.email) {
                        const key = childSnapshot.key
                        this.setState({studentEntry: key})
                    }
                });
            });
        } else {
            teachersRefs.on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    const childData = childSnapshot.val();
                        
                    if(childData.email === this.state.student.email) {
                        const key = childSnapshot.key
                        this.setState({studentEntry: key})
                    }
                });
            });
        }

        const options = [];
        this.state.subjectsList.map((key, value) => options.push({
            "value": key, "label": key
        }));
    }

    render() {
        //todo: nu merge sa pun un class container, afecteaza multiselect
        //todo: inca cateva butoane
        return (   
            <> 
                <h3 style={{margin:40, marginLeft:100}}>Alege materiile pentru userul curent</h3>
                <div className="my-multiselect mt-4 col-md-8 col-offset-4" style={{margin: 40, marginLeft: 80, marginTop: 40}}>
                    <Select isMulti
                        defaultValue={
                            this.state.options
                        }
                        options={this.state.subjectsList.map(course => ({
                            "value": course, "label": course
                        }))}
                        onChange={this.handleChange}
                        style={{marginLeft:20}}
                    />
                </div>
                <Button className="col-md" variant="secondary" onClick={this.handleSubmit} style={{marginLeft: 100, marginRight: 100, width: 200}}>
                     Save changes
                </Button>
            </>
        );
    }
}

export default UpdateUser;