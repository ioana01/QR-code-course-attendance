import React,{ Component} from 'react'
import Card from '../Card/Card';
import img1 from './react-logo.png';

class Dashboard extends Component{

    render(){
        return(
            // <div>
                <div className="container-fluid d-flex justify-content-center">
                    <div className="row">
                        <div className="col-md-4">
                            <Card imgsrc={img1} title="Materia 1"/>
                        </div>
                        <div className="col-md-4">
                            <Card imgsrc={img1} title="Materia 2"/>
                        </div>
                        <div className="col-md-4">
                            <Card imgsrc={img1} title='Materia 3'/>
                        </div>
                    </div>
                </div>
            // </div>
        );
    }
}

export default Dashboard;