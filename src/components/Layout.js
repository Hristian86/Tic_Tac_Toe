import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer';

const Layout = (props) => {
    
    return <div>
        <Container fluid className="pl-0 pr-0">
            {props.children}
        </Container>
        <Footer />
    </div>
}

export default Layout;