import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";


const ProfileScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);

	const { loading, error, user } = userDetails;

	const [searchParams] = useSearchParams();
 

	const navigate = useNavigate();


    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
	}, [navigate, userInfo,dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Parolele nu sunt aceleasi ");
		} else {
			// dispatch update profile
		}
	};

	if (error) {
		console.log(error);
	}

	return (
		<Row>
			<Col md={3}>
				<h2>Profil utilizator</h2>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
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
							onChange={(e) => setEmail(e.target.value)}
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
						Modifica
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2> Comenzile mele </h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
