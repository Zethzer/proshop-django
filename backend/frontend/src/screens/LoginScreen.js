import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

export default function LoginScreen() {
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const { error, loading, userInfos } = userLogin
    let urlParams = new URLSearchParams(location.search)
    const redirect = urlParams.get('redirect') ? urlParams.get('redirect') : '/'

    useEffect(() => {
        if (userInfos) {
            if (redirect !== '/') {
                navigate('/' + redirect)
            } else {
                navigate(redirect)
            }
        }
    }, [userInfos, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}