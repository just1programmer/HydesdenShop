import React , {useState,useEffect} from 'react'
import {
	Link,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer'
import './LoginScreen.scss'
const LoginScreen = () => {


  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [validationError, setValidationError] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);

  const {loading,error,userInfo} = userLogin;

  const [searchParams] = useSearchParams();
	const redirect = searchParams.get("redirect");

  const navigate = useNavigate();


  useEffect(() => {
    if(userInfo){
      navigate('/')
    }
  },[navigate,userInfo,redirect])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email,password))
  }
  
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

  
  if(error){
	console.log(error)
  }

  return (
		<FormContainer>
			<h1>Logheaza-te</h1>
			{error && <Message variant="danger">{error}</Message>}
			{validationError && <Message variant="danger">{validationError}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Introduceti emailul"
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
				<Button type="submit" variant="primary" className="my-4">
					Sign In
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					<span className="newClient">Client Nou?</span>{" "}
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className='register'>
						Inregistreaza-te
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default LoginScreen