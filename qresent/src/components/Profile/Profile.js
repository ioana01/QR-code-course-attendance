import React, {Component} from 'react';
import { database, auth } from '../../firebase';
import { CheckIfUserIsStudent } from '../../utils/utils.js';
import img from './Profile.jpg'
import './Profile.css'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }

    async componentDidMount() {
        const email = auth.currentUser.email;

        if(CheckIfUserIsStudent(email)) {
            database
            .ref('students/')
            .once('value')
            .then(snapshot => {
                snapshot.forEach((child) => {
                    let dict = child.val();

                    if (dict["email"] == auth.currentUser.email){
                        this.setState({currentUser : child.val()});
                    }
                });
            });
        }
        else {
            database
            .ref('professors/')
            .once('value')
            .then(snapshot => {
                snapshot.forEach((child) => {
                    let dict = child.val();

                    if (dict["email"] == auth.currentUser.email){
                        this.setState({currentUser : child.val()});
                    }
                });
            });
        }
    }


    render() {
        return (
            <div class="page-content page-container" id="page-content">
                <div class="padding">
                    <div class="row container d-flex justify-content-center">
                        <div class="col-xl-6 col-md-12">
                            <div class="card user-card-full">
                                <div class="row m-l-0 m-r-0">
                                    <div class="col-sm-4 bg-c-lite-green user-profile">
                                        <div class="card-block text-center text-white">
                                            <div class="m-b-25"> <img src={img} class="img-radius" alt="User-Profile-Image"/> </div>
                                            <h6 class="f-w-600">{this.state.currentUser["name"]}</h6>
                                            {(() => {  
                                                if (CheckIfUserIsStudent(auth.currentUser.email)) {
                                                    return (
                                                        <div>
                                                            <p>Student</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div>
                                                            <p>Profesor</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                        </div>
                                                    )
                                                }
                                            })()}
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="card-block">
                                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">University</h6>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <p class="m-b-10 f-w-600">University Politehnica of Bucharest</p>
                                                    <h6 class="text-muted f-w-400">Faculty of Automatic Control and Compter Science</h6>
                                                </div>
                                    
                                            </div>

                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div class="row">
                                                {(() => {  
                                                    if (CheckIfUserIsStudent(auth.currentUser.email)) {
                                                        return (
                                                            <div class="col-sm-6">
                                                                <p class="m-b-10 f-w-600">Group</p>
                                                                <h6 class="text-muted f-w-400">{this.state.currentUser["group"]}</h6>
                                                            </div>
                                                        )
                                                    } 
                                                })()}
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <p class="m-b-10 f-w-600">Email</p>
                                                        <h6 class="text-muted f-w-400">{auth.currentUser.email}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;