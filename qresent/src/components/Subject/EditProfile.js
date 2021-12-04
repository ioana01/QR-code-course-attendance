import React, { Component } from "react";
import app from "../../firebase.js"
import { database, auth } from "../../firebase";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap"
import { style } from "dom-helpers";

class EditProfile extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            materiiList: [],
            materieKey : ""
        }
        this.editt = this.editt.bind(this);
    }
    
    async componentDidMount() {
        let materiiListAll = [];
        const materiiRefs = database.ref('materii');

        await materiiRefs.on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            materiiListAll.push(childData);

            if(childData.name === this.props.match.params.id) {
              this.setState({materieKey : childSnapshot.key});
            }
          });

          this.setState({ materiiList : materiiListAll});
        });
        
    }    
  editt = (event) => {
    const paragraph = document.getElementById("edit");
    const edit_button = document.getElementById("edit-button");
    const end_button = document.getElementById("end-editing");
    const db = app.database();

    edit_button.addEventListener("click", function() {
      paragraph.contentEditable = true;
      paragraph.style.backgroundColor = "#dddbdb";
    } );
    
    end_button.addEventListener("click", function() {
      paragraph.contentEditable = false;
      paragraph.style.backgroundColor = "#ffe44d";
    } );

    database.ref('materii').child(this.state.materieKey).update({'general_info':paragraph.innerText});
  }

  
  render() {
    return ( 
      <div>     
        <div id="container">
          <p id="edit"><b> Click "Edit" button to edit content. </b></p>      
          <div className="row">
            <Button className="col-auto subject-button" variant="dark" onClick={this.editt} id="edit-button">Edit</Button>
            <Button className="col-auto subject-button" variant="dark" onClick={this.editt} id="end-editing">Done</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditProfile);
