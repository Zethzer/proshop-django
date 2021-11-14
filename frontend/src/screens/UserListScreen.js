import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteUser, getUserList } from '../actions/userActions'

export default function UserListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfos } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfos && userInfos.is_admin) {
            dispatch(getUserList())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, userInfos, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loading ? (<Loader/>
            ) : error ? (<Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.is_admin ? (
                                <i className='fas fa-check' style={{ color: 'green' }}/>
                            ) : (
                                <i className='fas fa-times' style={{ color: 'red' }}/>
                            )}</td>
                            <td>
                                <Button as={Link} to={`/admin/user/${user._id}/edit`}
                                        variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'/>
                                </Button>
                                <Button variant='danger' className='btn-sm ml-4'
                                        onClick={() => deleteHandler(user._id)}>
                                    <i className='fas fa-trash'/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}
