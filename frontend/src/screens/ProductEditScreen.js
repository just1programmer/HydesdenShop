import React, {useState,useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails,updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = () => {

    const { id } = useParams();

    const [name,setName] = useState('')
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    
    const dispatch = useDispatch();
	const navigate = useNavigate();
    const productDetails = useSelector((state)=>state.productDetails)
    const {loading,error,product } = productDetails;

	const productUpdate = useSelector((state)=>state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate, success:successUpdate } = productUpdate;

    useEffect(()=>{

		if(successUpdate){

			dispatch({type:PRODUCT_UPDATE_RESET})
			navigate('/admin/productlist')
		}else{
			 if (!product.name || product._id !== id) {
					dispatch(listProductDetails(id));
				} else {
					setName(product.name);
					setPrice(product.price);
					setDescription(product.description);
					setImage(product.image);
					setBrand(product.brand);
					setCountInStock(product.countInStock);
					setCategory(product.category);
				}
		}
       
    },[id,dispatch,product,successUpdate])

    
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateProduct({
			_id:id,
			name,
			price,
			image,
			brand,
			category,
			description,
			countInStock
		}))
    }

    return (
			<>
				<Link to="/admin/productlist">
					<Button>Go back</Button>
				</Link>
				<FormContainer>
					<h1>Editeaza prousul</h1>
					{loadingUpdate && <Loader/>}
					{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
					{loading ? (
						<Loader />
					) : error ? (
						<Message variant="danger">{error}</Message>
					) : (
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="name">
								<Form.Label>Nume produs</Form.Label>
								<Form.Control
									type="text"
									placeholder="Introduceti numele produsului"
									value={name}
									onChange={(e) => setName(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="price">
								<Form.Label>Pret</Form.Label>
								<Form.Control
									type="number"
									placeholder="Introduceti pretul produsului"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="image">
								<Form.Label>Imagine</Form.Label>
								<Form.Control
									type="text"
									placeholder="Introduceti URL imagine"
									value={image}
									onChange={(e) => setImage(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="brand">
								<Form.Label>Brand</Form.Label>
								<Form.Control
									type="text"
									placeholder="Introduceti Brandul produsului"
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="countInStock">
								<Form.Label>Cantitate in stock</Form.Label>
								<Form.Control
									type="number"
									placeholder="Introduceti cantitatea disponibila"
									value={countInStock}
									onChange={(e) => setCountInStock(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="category">
								<Form.Label>Categoria produsului</Form.Label>
								<Form.Control
									type="text"
									placeholder="Introduceti categoria produsului"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								></Form.Control>
							</Form.Group>

							<Form.Group controlId="description">
								<Form.Label>Descrierea produsului</Form.Label>
								<Form.Control
									type="text"
									placeholder="Introduceti descrierea produsului"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								></Form.Control>
							</Form.Group>


                            <Button type='submit' variant='primary'>
                                Modifica
                            </Button>
						</Form>
					)}
				</FormContainer>
			</>
		);
}

export default ProductEditScreen