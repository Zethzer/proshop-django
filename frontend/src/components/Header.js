import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

export default function Header() {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfos } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Link to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Nav.Link as={Link} to='/cart'>
                                <i className='fas fa-shopping-cart'/>Cart
                            </Nav.Link>

                            {userInfos ? (
                                <NavDropdown title={userInfos.name} id='username'>
                                    <NavDropdown.Item as={Link} to='/profile'>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={Link} to='/login'>
                                    <i className='fas fa-user'/>Login
                                </Nav.Link>
                            )}

                            {userInfos && userInfos.is_admin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <NavDropdown.Item as={Link} to='/admin/userlist'>
                                        Users
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/products'>
                                        Products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/orders'>
                                        Orders
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
