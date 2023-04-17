import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = () => {

    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart;

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({
            address,city,postalCode,country
        }))
        navigate('/payment');
    }

	return (
		<FormContainer>
            <CheckoutSteps step1 step2 />
			<h1>Livrare</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Adresa</Form.Label>
					<Form.Control
						type="text"
						placeholder="Adresa"
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Label>Oras</Form.Label>
					<Form.Control
						type="text"
						placeholder="Oras"
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="postalCode">
					<Form.Label>Cod Postal</Form.Label>
					<Form.Control
						type="text"
						placeholder="Cod postal"
						value={postalCode}
						required
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="country">
					<Form.Label>Tara</Form.Label>
					<Form.Control
						type="text"
						placeholder="Tara"
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
                <Button type="submit" variant="primary">
                    Continua
                </Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
