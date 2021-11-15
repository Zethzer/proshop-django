import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

export default function ProductEditScreen() {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfos } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (userInfos && !userInfos.is_admin) {
            navigate('/login')
        }

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(params.id)) {
                dispatch(listProductDetails(params.id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [product, navigate, params, dispatch, userInfos, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: params.id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', params.id)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfos.access}`,
                    'X-CSRFToken': Cookies.get('csrftoken')
                }
            }

            const { data } = await axios.post(
                '/api/products/upload/',
                formData,
                config
            )

            setImage(data)
            dispatch(listProductDetails(params.id))
            setUploading(false)
        } catch (e) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group className='mb-3' controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter Price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>
                                <Form.Control type='file' onChange={uploadFileHandler}/>
                                {uploading && <Loader/>}
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='countinstock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter Stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>Update</Button>
                        </Form>
                    )}
            </FormContainer>
        </div>
    )
}
