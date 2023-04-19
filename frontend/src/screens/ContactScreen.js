import React, { useState, useEffect,useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link, useNavigate  } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import './ContactScreen.scss'

const ContactScreen = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone]=useState('');
	// const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
	const [message, setMessage] = useState(null);
	const [sentMessage, setSentMessage] = useState(false)
	const form = useRef();
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;


	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"));
			} else {
				setName(user.name);
				setEmail(user.email);
				console.log(email);
			}
		}
	}, [navigate, user, userInfo, dispatch]);




	const sendEmail = (e) => {
		e.preventDefault();
		emailjs
			.sendForm(
				"service_q44b265",
				"template_contact",
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
			setSentMessage(true);
			e.target.reset();
	};

 
	if (error) {
		console.log(error);
	}

	return (
		<div className="contact-form-container">
			<h2 style={{ color: "rgb(255, 125, 60)" }}>
				<i class="fa-solid fa-envelope" style={{ color: "white" }}></i> Lasa-ne
				o parere <i class="fa-solid fa-envelope" style={{ color: "white" }}></i>
			</h2>
			{error && <Message variant="danger">{error}</Message>}
			{sentMessage && (
				<Message variant="success">Mesajul a fost trimis cu success</Message>
			)}

			{loading && <Loader />}
			<form onSubmit={sendEmail} className="contact-form" ref={form}>
				
					<label>Nume</label>
					<input
						type="text"
						placeholder="Nume"
						value={name}
						name="fullName"
						onChange={(e) => setName(e.target.value)}
					></input>
				
			
					<label>Email</label>
					<input
						type="email"
						placeholder="Email"
						name="email"
						value={email}
					></input>
		
					<label>Telefon</label>
					<input
						type="text"
						placeholder="Numar Telefon"
						name="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					></input>
				{/* <Form.Group controlId="subject">
					<Form.Label>Subiect</Form.Label>
					<Form.Control
						type="text"
						placeholder="Introduceti subiectul"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					></Form.Control>
				</Form.Group> */}
	 
					<label>Mesaj</label>
					<textarea 
						rows={10}
						placeholder="Mesaj..."
						name="message"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
			 
				<Button type="submit" variant="primary" className="my-4">
					Trimite
				</Button>
			</form>
		</div>
	);
};  

export default ContactScreen;