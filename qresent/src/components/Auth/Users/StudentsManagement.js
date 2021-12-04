import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContexts";
import { database } from "../../../firebase";
import { Link, useHistory } from "react-router-dom";
import firebase from 'firebase/compat/app';
import './../SignUp/SignUp.css';
import './Users.css';

export default function StudentsManagement() {
    const nameRef = useRef();
    const groupRef = useRef();
    const moodleRef = useRef();
    const emailRef = useRef();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault()

        const userData = {
            courses: [],
            name: nameRef.current.value,
            email: emailRef.current.value,
            group: groupRef.current.value,
            moodle_account: moodleRef.current.value
        }

        if (!emailRef.current.value.startsWith(moodleRef.current.value)) {
            return setError("Moddle account and email doesn't match");
        } else {
            firebase.auth().createUserWithEmailAndPassword(userData.email, userData.moodle_account);
            database.ref('students').push(userData);
        }

        try {
            setError("");
            setLoading(true);
            history.push("/admin")
        } catch(e) {
            setError(e.message);
        }

        setLoading(false);
    }

    function redirectToPage() {
        history.push("/admin")
    }

    return (
        <>
        {error && <Alert variant="danger">{error}</Alert>}
            <Card id='card-container-signup'>
                <Card.Title style={{"marginBottom": -30, "marginTop": 20}}>Add student</Card.Title>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" ref={nameRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" ref={emailRef} placeholder="Enter email" required/>
                            <Form.Text className="text-muted">
                                Please insert a student email eg: "nume.prenume@stud.acs.upb.ro"
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Moodle account</Form.Label>
                            <Form.Control type="text" ref={moodleRef} placeholder="Enter the moodle account" required/>
                            <Form.Text className="text-muted">
                                Please insert a student moodle account eg: "nume.prenume"
                            </Form.Text>
                        </Form.Group>
                        <Form.Group id="group">
                            <Form.Label>Group</Form.Label>
                            <Form.Select ref={groupRef} required>
                                <option>Select option</option>
                                <option>341C5</option>
                                <option>342C5</option>
                                <option>343C5</option>
                                <option>344C5</option>
                            </Form.Select>
                        </Form.Group>
                        <div className="row" style={{"marginTop": 20}}>
                            <Button className="col-md mr-3 ml-4 users-button" disabled={loading} type="submit">
                                Add new user
                            </Button>
                            <Button className="col-md mr-3 ml-4 users-button" onClick={redirectToPage}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}