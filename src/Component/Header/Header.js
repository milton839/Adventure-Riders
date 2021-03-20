import React from 'react';
import { Navbar,Nav,Button } from 'react-bootstrap';

const Header = () => {
    return (
        <div style={{ backgroundColor:'#98E2F6' }}>
            <Navbar className="container" expand="lg">
                <Navbar.Brand href="#home">
                    <h2 className="text-uppercase fw-bold">Adventure Riders</h2>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link className="fs-5 fw-bold active" href="/home">HOME</Nav.Link>
                    <Nav.Link className="fs-5 fw-bold" href="/destination">DESTINATION</Nav.Link>
                    <Nav.Link className="fs-5 fw-bold" href="/blog">BLOG</Nav.Link>
                    <Nav.Link className="fs-5 fw-bold" href="/contact">CONTACT</Nav.Link>
                    </Nav>
                    <Button style={{ backgroundColor:'tomato',padding:'5px 15px',border:'0', }} className="fs-5 fw-bold"><a style={{ textDecoration:'none',color:'white' }} href="/login">Log In</a></Button>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;