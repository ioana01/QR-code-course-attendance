import React, {Component}  from 'react';
import {Pie} from 'react-chartjs-2';
import { database } from "../../../firebase";

class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          enrolledStudents: 0,
          presentStudents: 0
        }

        this.enrolledStudents(props);
        this.presentStudents(props);
    }
    
    async presentStudents(props) {
      const attendance = database.ref('attendance');
      const currentDate = (new Date()).toString().split(' ').slice(0, 4).join(' ');

      await attendance.on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const scanQRDate = childSnapshot.val().time.split(' ').slice(0, 4).join(' ');
            const course = childSnapshot.val().course;

            if(scanQRDate === currentDate && props.course === course) {
              this.state.presentStudents++;
            }
        });
      });
    }

    async enrolledStudents(props) {
      const studentRefs = database.ref('students');
      
      await studentRefs.on('value', snapshot => {
          snapshot.forEach(childSnapshot => {
              const childData = childSnapshot.val();
              
              if (childData.courses && childData.courses.includes(props.course)) {
                this.state.enrolledStudents++;
              }
          });
      });
    }

    async componentDidMount() {
      this.interval = setInterval(
        () => this.setState({ time: Date.now() }),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    statePieChart(props) {
      return  {
        labels: ['Prezenti', 'Absenti'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#B5E056',
              '#E95959'
            ],
            hoverBackgroundColor: [
              '#95B749', //green
              '#C14B4B' //red
            ],
            data: [this.state.presentStudents, this.state.enrolledStudents - this.state.presentStudents]
          }
        ]
      }
    }
  
    render() {
      return (
        <div className="piecontainer d-flex justify-content-center">
          <Pie className="piecontainer"
            data = {this.statePieChart()}
            width = {400}
            height = {400}
            options = {{
                plugins: {
                  title: {
                    display:true,
                    text:'Statistica Studenti prezenti/Studenti absenti'
                  },
                  legend:{
                    position:'top'
                  }
                },
                maintainAspectRatio: false
            }}
          />
        </div>
      );
    }
}

export default PieChart;