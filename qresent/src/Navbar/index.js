import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Card from '../Dashboard/Cards.js';
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
                                        <Nav className="mx-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link href="/scanqr">Scan QR</Nav.Link>
                                        <Nav.Link href="/login">Log Out</Nav.Link>
                                        </Nav>
                                        <Nav className = "justify-content-center">
                                        <NavDropdown title="My menu" id="basic-nav-dropdown" menuVariant="dark">
                                            <NavDropdown.Item href="profile">My Profile</NavDropdown.Item>
                                            <NavDropdown.Item href="/">Home</NavDropdown.Item>
                                            <NavDropdown.Item href="/scanqr">Scan QR</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="login">Log Out</NavDropdown.Item>
                                        </NavDropdown>
                                        </Nav>
                                    </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/">
                                    <Card />
                                </Route>
                                <Route exact path="/scanqr">
                                    <ScanQR />
                                </Route>
                                <Route exact path="/login">
                                    
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;