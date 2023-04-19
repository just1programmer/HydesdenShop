import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [name,setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null);
	// email validation
	const [validationError, setValidationError] = useState(null);
	

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);

	const { loading, error, userInfo } = userRegister;

	const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect");

	const navigate = useNavigate();


	function isValidEmail(email) {
			return /\S+@\S+\.\S+/.test(email);
	}


	const handleChange = (event) => {
		if (!isValidEmail(event.target.value)) {
			setValidationError("Emailul este invalid.");
		} else {
			setValidationError(null);
		}

		setEmail(event.target.value);
	};



	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Parolele nu sunt aceleasi ')
        } else{
            dispatch(register(name,email,password))
        }
	};

	if (error) {
		console.log(error);
	}

	return (
		<FormContainer>
			<h1>Inregistreaza-te</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{validationError && <Message variant="danger">{validationError}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Nume</Form.Label>
					<Form.Control
						type="text"
						placeholder="Nume"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Email"
						value={email}
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Parola</Form.Label>
					<Form.Control
						type="password"
						placeholder="Introduceti parola"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="confirmPassword">
					<Form.Label>Confirma Parola</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirmati Parola"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary" className="my-4">
					Inregistreaza-te
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Ai deja un cont?{" "}
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
						Logheaza-te
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
