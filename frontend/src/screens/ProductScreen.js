import React ,{useState,useEffect} from 'react' 
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Form } from 'react-bootstrap'
import { listProductDetails,createProductReview } from '../actions/productActions'
import './ProductScreen.scss'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = () => {

const userDetails = useSelector((state) => state.userDetails);
const { user } = userDetails;

const productDetails = useSelector((state) => state.productDetails);
const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		success: successProductReview,
		loading: loadingProductReview,
		error: errorProductReview,
	} = productReviewCreate;

const [quantity,setQuantity] = useState(1);
const [rating,setRating] = useState(0);
const [comment,setComment] = useState('');

const dispatch = useDispatch();
let { id } = useParams();
const navigate = useNavigate();

useEffect(() => {
	window.scrollTo(0, 0);
	if(successProductReview){
		setRating(0)
		setComment('')
		dispatch(listProductDetails(id));
	}
	 if (!product._id || product._id !== id) {
      dispatch(listProductDetails(id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  
	}, [dispatch,id,successProductReview]);

const addToCartHandler = () => {
	navigate(`/cart/${id}?qty=${quantity}`)
}


 const submitHandler = (e) => {
	e.preventDefault();
	dispatch(createProductReview(id,{
		rating,comment
	}
	))
 };





  // folosim useParams ca sa luam parametrul din URL

  // luam produsul cu id din URL
  // const product = products.find(product => product._id ===id)




  return (
		<>
			<Link className="btn dark-btn my-3" to="/home">
				<span> Go Back</span>
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						<Col md={5}>
							<Image src={product.image} alt={product.name} fluid></Image>
						</Col>
						<Col md={4}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									{" "}
									<h2>{product.name}</h2>{" "}
								</ListGroup.Item>
								<ListGroup.Item>
									{" "}
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>{" "}
								</ListGroup.Item>
								<ListGroup.Item>
									{" "}
									<h2>Pret: {product.price} Lei</h2>{" "}
								</ListGroup.Item>
								<ListGroup.Item>
									{" "}
									<p>{product.description}</p>{" "}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<Row>
											<Col>Pret:</Col>
											<Col>
												<strong>{product.price} Lei</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Statut:</Col>
											<Col>
												{product.countInStock > 0
													? "In Stock"
													: "In afara Stockului"}
											</Col>
										</Row>
									</ListGroup.Item>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Cantitate</Col>
												<Col>
													<Form.Control
														as="select"
														className="form-select"
														value={quantity}
														onChange={(e) => setQuantity(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Button
											className="btn w-100 add-to-cart"
											type="button"
											disabled={product.countInStock === 0}
											onClick={addToCartHandler}
										>
											Add to cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviewuri</h2>
							{product.reviews.length === 0 && (
								<Message>Nu exista reviewuri</Message>
							)}
							<ListGroup variant="flush">
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Lasa o parere despre produs</h2>
									{errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="rating">
											<Form.Label>Rating</Form.Label>
											<select
												value={rating}
												onChange={(e) => setRating(e.target.value)}
											>
												<option value="0">Selecteaza ...</option>
												<option value="1">1 - Slab</option>
												<option value="2">2 - OK</option>
												<option value="3">3 - Bun</option>
												<option value="4">4 - Foarte bun</option>
												<option value="5">5 - Excelent</option>
											</select>
										</Form.Group>
										<Form.Group controlId='comment'>
											<Form.Label>
												Comentariu
											</Form.Label>
											<Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)}>

											</Form.Control>
										</Form.Group>
										<Button type='submit' variant='primary'>
											Adauga review
										</Button>
									</Form>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
}

export default ProductScreen