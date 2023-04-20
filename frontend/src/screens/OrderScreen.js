import React, { useState, useEffect } from "react";
import axios from "axios";
import {PayPalButton} from 'react-paypal-button-v2'
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
import { getOrderDetails, payOrder,deliverOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from "../constants/orderConstants";

const OrderScreen = () => {
// Pentru butoanele de paypal folosim react-paypal-button-v2
    let {id}  = useParams();
	// asta e pentru Paypal
	const [sdkReady,setSdkReady] = useState(false)
	const currency = 'RON'
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const leiToeuroRate = 0.2;
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay= useSelector((state) => state.orderPay);
	const { loading:loadingPay, success: successPay } = orderPay;


	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;


		const userLogin = useSelector((state) => state.userLogin);
		const { userInfo} = userLogin;

	if(!loading){
	order.itemsPrice = order.orderItems.reduce(
		(acc, item) => acc + item.price * item.qty,
		0
	);
}

	useEffect(() => {
		const addPayPalScript = async () =>{
			const { data: clientId } = await axios.get("/api/config/paypal");
			// cream dinamic un script :)
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
			script.async = true;
	 
			//  o sa avem state pentru paypal :) ca sa stim cand putem folosi paypal
			script.onload = () => {
				// cand scriptul a fost incarcat- marcam sdk ready - adica sciptul poate fi folosit :)
				setSdkReady(true);
			};
			// Dupa ce am incarcat scriptul de pe server , il adaugam in frontend in body

			document.body.appendChild(script)
			// ca si rezumat la toata functia addPayPalScript -- primim din backend un client Secret - un ID . Apoi folosim acest ID pentru a crea un script dinamic. apoi dupa ce am creat scriptul dinamic,  il incarcam in frontend, in body si e gata sa fie folosit. 
		}


		if(!order || successPay || successDeliver){
			dispatch({type:ORDER_PAY_RESET})
			dispatch({type:ORDER_DELIVER_RESET})
	        dispatch(getOrderDetails(id));
		} else if(!order.isPaid){
			// Daca comanda nu e platita, adaugam scriptul de paypal :) 
			if(!window.paypal){
				addPayPalScript()
			}else{
				setSdkReady(true)
			}
		}
	}, [successPay,navigate,id,order,successDeliver]);

	

	const successPaymentHandler = (paymentResult) =>{
		console.log(paymentResult)
		dispatch(payOrder(id,paymentResult))
	}

	const deliverHandler = () =>{
	 
		dispatch(deliverOrder(id))
		dispatch(getOrderDetails(id))
	}


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
								<strong> Nume: </strong> {order.user.name}
							</p>
							<p>
								Email :{" "}
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Adresa: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city},
								{order.shippingAddress.postalCode},
								{order.shippingAddress.country}
							</p>

							{order.isDelivered ? (
								<Message variant="success">
									Expediata la data de : {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">
									Comanda nu a fost inca expediata
								</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Metoda de Plata</h2>
							<p>
								<strong>Metoda:</strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">
									Platita la data de : {order.paidAt}
								</Message>
							) : (
								<Message variant="danger">
									Comanda nu a fost inca platita 
								</Message>
							)}
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
												<Col md={7}>
													<LinkContainer to={`/product/${item.product}`}>
														<NavLink>{item.name}</NavLink>
													</LinkContainer>
												</Col>
												<Col md={4} style={{fontFamily:'Reggae One',fontSize:'small'}} className='text-end'>
													{item.qty} x Lei {item.price} = Lei {item.qty * item.price}
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
									<Col>Lei {Number(order.itemsPrice).toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Livrare</Col>
									<Col>Lei {Number(order.shippingPrice).toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Taxa TVA 19%</Col>
									<Col>Lei {Number(order.taxPrice).toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Pret Total</Col>
									<Col>Lei {Number(order.totalPrice).toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (<ListGroup.Item>
								{loadingPay && <Loader/>}
								{!sdkReady ? <Loader/> : (
									<PayPalButton amount={Number(order.totalPrice*leiToeuroRate).toFixed(2)}  onSuccess={successPaymentHandler} currency='EUR'/>
								)}
							</ListGroup.Item>)}
							{loadingDeliver && <Loader/>}
							{userInfo.isAdmin && order.isPaid && !order.isDelivered && (<ListGroup.Item>
								<Button type="button" className="btn btn-block" onClick={deliverHandler}>Marcheaza ca Expediat</Button>
							</ListGroup.Item>)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
