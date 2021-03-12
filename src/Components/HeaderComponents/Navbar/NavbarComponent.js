import React from 'react';
import { Navbar,Nav,Button } from 'react-bootstrap';
import LoginContext from './../../../Contexts/LoginContext';

class NavbarComponent extends React.Component{

    static contextType = LoginContext;

    render(){
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Todos Manager</Navbar.Brand>
                <Nav className="ml-auto mr-1">
                    <Nav.Link href="#home">صفحه اصلی</Nav.Link>
                    <Nav.Link href="#about-us">درباره ما</Nav.Link>
                    <Nav.Link href="#contact-us">تماس با ما</Nav.Link>
                </Nav>
                <Button onClick={this.context.changeLoginStatus} variant="primary" className={`btn-sm ${this.context.loginStatus ? 'btn-danger' : 'btn-success'}`}>{this.context.loginStatus ? 'خارج شوید' : 'وارد به سایت'}</Button>
            </Navbar>
        )    
    }
}

export default NavbarComponent;