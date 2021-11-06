import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Link to="/">
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Navbar.Text>
                                <Link className="nav-link" to="/cart">
                                    <i className="fas fa-shopping-cart"></i>Cart
                                </Link>
                            </Navbar.Text>
                            <Navbar.Text>
                                <Link className="nav-link" to="/login">
                                    <i className="fas fa-user"></i>Login
                                </Link>
                            </Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}