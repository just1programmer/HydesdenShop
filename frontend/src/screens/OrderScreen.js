import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	Button,
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	ListGroupItem,
	NavLink,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from '../components/Loader'
import { LinkContainer } from "react-router-bootstrap";
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = () => {
	

    let {id}  = useParams();
	console.log(id)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	console.log(order)

	useEffect(() => {
	
        dispatch(getOrderDetails(id))

	}, [navigate,id]);

 

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Comanda {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Livrare</h2>
							<p>
								<strong>Adresa:</strong>
								{order.shippingAddress.address}, {order.shippingAddress.city},
								{order.shippingAddress.postalCode},{order.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Metoda de Plata</h2>
							<strong>Metoda:</strong>
							{order.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Comanda dumneavoastra</h2>

							{order.orderItems.length === 0 ? (
								<Message>Comanda nu exista</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
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
													{item.qty} x Lei{item.price} = Lei
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
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Sumarul Comenzii</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Obiecte</Col>
									<Col>Lei {order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Livrare</Col>
									<Col>Lei {order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Taxa TVA 19%</Col>
									<Col>Lei {order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Pret Total</Col>
									<Col>Lei {order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
