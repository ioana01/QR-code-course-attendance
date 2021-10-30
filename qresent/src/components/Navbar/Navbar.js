import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContexts"
import { Link, useHistory } from "react-router-dom"
import './Navbar.css'

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-transparent" id='navbar-container'>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse navbar-div" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item item-active item">
                        <a class="nav-link" href="/">Cursuri</a>
                    </li>
                    <li class="nav-item item-active item">
                        <a class="nav-link" href="/profile">Profil</a>
                    </li>
                </ul>
                {/* <ul class="nav navbar-nav navbar-right">
                    <li class="nav-item item">
                        <a class="nav-link" href="/logout">Logout</a> */}
                        {/* onClick={handleLogout} */}
                    {/* </li>
                </ul> */}
            </div>
        </nav>
    )
}