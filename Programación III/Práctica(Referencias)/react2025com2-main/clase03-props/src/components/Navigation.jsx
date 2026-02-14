import React from 'react'
import {Navbar,Container,Nav,NavDropdown} from "react-bootstrap"
 
const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-warning">
      <Container>
        
        
       
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link href="#link">otro lado</Nav.Link>
            <Nav.Link href="#link">Facebook</Nav.Link>
            
          </Nav>
       
      </Container>
    </Navbar>
  )
}

export default Navigation