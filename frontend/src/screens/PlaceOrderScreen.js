import React, {useEffect } from "react";
import {  useNavigate, } from "react-router-dom";
import { Button,Row, Col,ListGroup,Image,Card, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message'
import CheckoutSteps from "../components/CheckoutSteps";
import { LinkContainer } from "react-router-bootstrap";
import { createOrder } from "../actions/orderActions";
import "./PlaceOrderScreen.scss"
const PlaceOrderScreen = () => {


    const cart = useSelector(state=> state.cart);
    const {paymentMethod} = cart;
	const dispatch = useDispatch();
	const navigate = useNavigate();

 
    // Calculate prices
    cart.itemsPrice = cart.cartItems.reduce((acc,item)=> acc+item.price * item.qty,0)
	cart.itemsPrice = Number(cart.itemsPrice).toFixed(2)
    // costul de transport
    cart.shippingPrice = cart.itemsPrice > 1000 ? 0 : 25

    // taxa TVA pe care o plateste clientul pentru produs
    cart.taxPrice = Number(0.19 * cart.itemsPrice).toFixed(2)


    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)


	const orderCreate = useSelector(state=> state.orderCreate)
	const {order,success,error} = orderCreate

	console.log('===== cart Items : ', cart.cartItems)


	useEffect(()=>{
		if(success){
			console.log(order._id);
			localStorage.removeItem("cartItems");
			navigate(`/order/${order._id}`)

		}
	},[dispatch,success,navigate])

    const placeOrderHandler = ()=>{
        dispatch(createOrder({
			orderItems: cart.cartItems,
			shippingAddress: cart.shippingAddress,
			paymentMethod: paymentMethod.paymentMethod,
			itemsPrice: cart.itemsPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
			totalPrice: cart.totalPrice
		}))
    }

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8} className="p-4">
					<ListGroup variant="flush">
						<ListGroup.Item className="order-details p-5">
							<h2>Livrare</h2>
							<p>
								<strong>Adresa:</strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city},
								{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item className="order-details  p-5">
							<h2>Metoda de Plata</h2>
							<strong>Metoda:</strong>
							{paymentMethod.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item className="order-details p-5">
							<h2>Comanda dumneavoastra</h2>

							{cart.cartItems.length === 0 ? (
								<Message>Cosul dvs de cumparaturi este gol</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index} className="order-details">
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<LinkContainer to={`/product/${item.product}`}>
														<NavLink>{item.name}</NavLink>
													</LinkContainer>
												</Col>
												<Col md={4}>
													{item.qty} x Lei {item.price} = Lei{" "}
													{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4} className="my-4">
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Sumarul Comenzii</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Obiecte</Col>
									<Col>Lei {cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col className="text-start">Livrare</Col>
									<Col>Lei {cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Taxa TVA 19%</Col>
									<Col>Lei {cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Pret Total</Col>
									<Col>Lei {cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
								{error && <Message variant="danger">{error}</Message>}
							<ListGroup.Item>
								<Button
									type="button"
									className="w-100"
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Plaseaza comanda
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
