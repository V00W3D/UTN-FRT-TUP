import React from 'react'
import { Nav, Navbar } from "react-bootstrap"
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">

      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="me-auto">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/contact">Contactos</Link>
      </Nav>
    </Navbar>
  )
}

export default Navigation