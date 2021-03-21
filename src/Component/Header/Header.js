import React from 'react';
import { Navbar,Nav,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{ backgroundColor:'#98E2F6' }}>
            <Navbar className="container" expand="lg">
                <Navbar.Brand>
                    <h2 className="text-uppercase fw-bold">Adventure Riders</h2>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link ><Link className="fs-5 fw-bold active" to="/home">HOME</Link></Nav.Link>
                    <Nav.Link><Link className="fs-5 fw-bold" to="/rideType/CAR">DESTINATION</Link></Nav.Link>
                    <Nav.Link><Link className="fs-5 fw-bold" to="/blog">BLOG</Link></Nav.Link>
                    <Nav.Link><Link  className="fs-5 fw-bold" to="/contact">CONTACT</Link></Nav.Link>
                    </Nav>
                    <Button style={{ backgroundColor:'tomato',padding:'5px 15px',border:'0', }} className="fs-5 fw-bold"><a style={{ textDecoration:'none',color:'white' }} href="/login">Log In</a></Button>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;