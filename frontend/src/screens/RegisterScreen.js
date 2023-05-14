import React, { useState, useEffect,useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import './RegisterScreen.scss'

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [name,setName] = useState("");
	const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null);
	const [sentMessage, setSentMessage] = useState(false);
	const [readyToSendEmail,setReadyToSendEmail] = useState(false);
	// email validation
	const [validationError, setValidationError] = useState(null);
	const form = useRef();

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



	
	const sendEmail = (e) => {

		if(!validationError){
			emailjs
			.sendForm(
				"service_q44b265",
				"template_inregistrare",
				form.current,
				"IXIv4qSYGZ3v-HGYP"
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
		}
		
		
	};



	const submitHandler = (e) => {
		e.preventDefault();
        if(password !== confirmPassword ){
            setMessage('Parolele nu sunt aceleasi ')
        }
		else if(validationError != null){
			setMessage("Email invalid");
		} else{
	
	
			dispatch(register(name, email, password))
			setPhone('')
			setMessage('');
			setPassword('');
			setConfirmPassword('');
			setName('');
        }	
	};



	return (
		<div className="contact-form-container">
		<h2 style={{ color: "rgb(255, 125, 60)" }}>
			 Inregistreaza-te  
		</h2>
		{error && <Message variant="danger">{error}</Message>}
		{message && <Message variant='danger'>{message}</Message>}
		{!error && sentMessage && (
			<Message variant="success">Inregistrarea a fost facuta cu success</Message>
		)}
		{loading && <Loader />}
		
			<form onSubmit={submitHandler} className="contact-form" ref={form}>
				{/* nume */}
				<label>Nume</label>
				<input
					type="text"
					placeholder="Nume"
					value={name}
					name="fullName"
					onChange={(e) => setName(e.target.value)}
					required
				></input>
				<label>Email</label>
				<input type="email" placeholder="Email" name="email" value={email} onChange={handleChange} required></input>
				<label>Telefon</label>
				<input
					type="text"
					placeholder="Numar Telefon"
					name="phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					required
				></input>
			 
					<label>Parola</label>
					<input
						type="password"
						placeholder="Introduceti parola"
						value={password}
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						required
					></input>
				 
				 
					<label>Confirma Parola</label>
					<input
						type="password"
						placeholder="Confirmati Parola"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					></input>
				<Button type="submit" variant="primary" className="my-4">
					Inregistreaza-te
				</Button>
			</form>
			<Row className="py-3">
				<Col>
					<span className="newClient">Ai deja un cont? </span>
					<Link
						to={redirect ? `/login?redirect=${redirect}` : "/login"}
						className="login"
					>
						Logheaza-te
					</Link>
				</Col>
			</Row>
		</div>
	);
};

export default RegisterScreen;



	
		
 