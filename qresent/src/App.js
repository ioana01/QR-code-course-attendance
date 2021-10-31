import React from "react"
import Signup from "./components/Auth/SignUp/SignUp";
import Login from "./components/Auth/Login/Login";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContexts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Subject from "./components/Subject/Subject";
import Form from "./components/Form/Form";

function App() {
  return (
    <>
      <Navbar/>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100">
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard}/>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/subject" component={Subject}/>
                <PrivateRoute exact path="/form" component={Form}/>
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  )
}

export default App
