import React ,{useState,useEffect} from 'react' 
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Form } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import './ProductScreen.scss'

const ProductScreen = () => {

const [quantity,setQuantity] = useState(1);

const dispatch = useDispatch();
let { id } = useParams();
const navigate = useNavigate();

useEffect(() => {
	dispatch(listProductDetails(id))
	}, [dispatch,id]);

const addToCartHandler = () => {
	navigate(`/cart/${id}?qty=${quantity}`)
}

const productDetails = useSelector(state => state.productDetails)

const { loading , error, product } = productDetails

  // folosim useParams ca sa luam parametrul din URL

  // luam produsul cu id din URL
  // const product = products.find(product => product._id ===id)

  return (
		<>
			<Link className="btn dark-btn my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid></Image>
					</Col>
					<Col md={3}>
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
											{product.countInStock > 0 ? "In Stock" : "In afara Stockului"}
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
													className='form-select'
													value={quantity}
													onChange={(e) => setQuantity(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
													})}
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
			)}
		</>
	);
}

export default ProductScreen