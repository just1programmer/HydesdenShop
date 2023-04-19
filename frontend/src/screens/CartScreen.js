import React, {useEffect} from 'react' 
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate, useSearchParams,useParams, Navigate } from "react-router-dom";
import Message from '../components/Message'
import {Row,Col, ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import { addToCart,removeFromCart } from '../actions/cartActions'
import "./CartScreen.scss"

const CartScreen = () => {

  let { id } = useParams();
  const productId = id;
  const [searchParams] = useSearchParams();
  const qty = searchParams.get('qty')

  const dispatch = useDispatch();



	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;



  const cart = useSelector(state => state.cart)
  const {cartItems} = cart;

  const shouldRedirect = true;

  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch,productId,qty])

  const navigate = useNavigate();


  const removeFromCartHandler = (id) =>{
	dispatch(removeFromCart(id))
  }

  const checkoutHandler = () =>{

	if(userInfo){
		navigate("/shipping", {
		});
	} else{
		navigate('/login')
	}

      
  }

  return (
		<Row className="cart-order">
			<Col md={12}>
				<h1>Cos de cumparaturi</h1>
				<Link className="btn btn-light my-3 btn-reggaefont" to="/">
					Mergi la pagina principala
				</Link>
				{cartItems.length === 0 ? (
					<Message>
						Cosul tau este gol <Link to="/">Du-te inapoi</Link>
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>Lei {item.price}</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											className="form-select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() => {
												removeFromCartHandler(item.product);
											}}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={12}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h1 className="text-end">
								Subtotal (
								{cartItems.reduce(
									(accumulator, item) => Number(accumulator) + Number(item.qty),
									0
								)}
								) produse
							</h1>
							<h2 className="text-end">
								{" "}
								Lei{" "}
								{cartItems
									.reduce((acc, item) => acc + item.qty * item.price, 0)
									.toFixed(2)}
							</h2>
						</ListGroup.Item>
						<ListGroup.Item  >
							<Button
								type="button"
								className="btn-block w-100 cart-btn"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
}

export default CartScreen