import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContexts";
import { Link, useHistory } from "react-router-dom";
import { CheckIfUserIsAdmin, CheckIfUserIsActive} from '../../../utils/utils.js';
import './Login.css';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef(); 
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
   
    function handleLogIn(e) {
        e.preventDefault()

        if(CheckIfUserIsActive(emailRef.current.value, 'students')||
        CheckIfUserIsActive(emailRef.current.value, 'professors') ||
        CheckIfUserIsAdmin(emailRef.current.value)) {
            handleSubmit(e);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            if(CheckIfUserIsAdmin(emailRef.current.value)) {
                history.push("/admin")
            }
            else {
                history.push("/")
            } 
        } catch(error) {
          setError(error.message);
        }
    
        setLoading(false);
    }

    
    return (
        <>
            <Card id='card-container-login'>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleLogIn}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="password" style={{marginBottom: "20px"}}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Button disabled={loading} className="w-100 auth-button" type="submit" style={{backgroundColor: "#343a40"}}>
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}