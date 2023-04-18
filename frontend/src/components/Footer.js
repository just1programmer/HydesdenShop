import React from 'react'
import { Container,Row,Col,Nav } from "react-bootstrap";
import './Footer.scss' 

const Footer = () => {
  return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						Copyright &copy; Hyde's Den 2023
					</Col>
				</Row>

				<div className="gototop">
					<Nav.Link  href="#header">
						<i className="fas fa-arrow-up"></i>
					</Nav.Link>
				</div>
			</Container>
		</footer>
	);
}

export default Footer