import React from 'react'

import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import './CheckoutSteps.scss'
const CheckoutSteps = ({step1,step2,step3,step4}) => {
  return (
		<Nav className="navlinks">
			<Nav.Item>
				{step1 ? (
					<LinkContainer to="/login">
						<Nav.Link>Login</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Login</Nav.Link>
				)}
			</Nav.Item>
			<Nav.Item>
				{step2 ? (
					<LinkContainer to="/shipping">
						<Nav.Link>Livrare </Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Livrare</Nav.Link>
				)}
			</Nav.Item>
			<Nav.Item>
				{step3 ? (
					<LinkContainer to="/payment">
						<Nav.Link>Plata</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Plata</Nav.Link>
				)}
			</Nav.Item>
			<Nav.Item>
				{step4 ? (
					<LinkContainer to="/placeorder">
						<Nav.Link>Plaseaza comanda</Nav.Link>
					</LinkContainer>
				) : (
					<Nav.Link disabled>Plaseaza comanda</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
}

export default CheckoutSteps