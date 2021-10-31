import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Card from '../Dashboard/Dashboard';
import ScanQR from '../ScanQR';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'


class BootstrapNavbar extends React.Component{

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">QResent</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="ml-auto">
                                            <Nav.Link href="/">Home</Nav.Link>
                                            <Nav.Link href="/scanqr">Scan QR</Nav.Link>
                                            <Nav.Link href="/login">Log Out</Nav.Link>
                                        </Nav>
                                    </Navbar.Collapse>
                            </Navbar>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;