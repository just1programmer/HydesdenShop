import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import Message from "../components/Message";
const PaymentScreen = () => {

    
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;


    if(!shippingAddress){
        navigate('/shipping')
    }

	const [paymentMethod, setPaymentMethod] = useState('');
	const [error,setError] = useState('');
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			savePaymentMethod({
				paymentMethod
			})
		);
		if(paymentMethod===undefined || paymentMethod===''){
			setError('Trebuie sa selectezi o metoda de plata!')
		}else{
			navigate("/placeorder");
		}
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Plata</h1>
			{error && <Message variant='danger'>{error}</Message>}
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Selecteaza metoda de plata</Form.Label>

					<Col>
						<Form.Check
							type="radio"
							label="PayPal sau Card"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						{/* <Form.Check
							type="radio"
							label="Numerar"
							id="Cash"
							name="paymentMethod"
							value="Cash"
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check> */}
					</Col>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continua
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
