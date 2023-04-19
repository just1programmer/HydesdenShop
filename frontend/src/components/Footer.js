import React from 'react'
import { Container,Row,Col,Nav,Button } from "react-bootstrap";
import './Footer.scss' 

const Footer = () => {
  return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						<span className="copyright">Copyright &copy; Hyde's Den 2023</span>
					</Col>
				</Row>
				<Row>
					<div className="text-center">
						<a href="#">
							<i
								class="fab fa-whatsapp"
								style={{ color: "white", fontSize: "x-large" }}
							></i>
						</a>
						<a href="#">
							{" "}
							<i
								class="fa-brands fa-facebook-f"
								style={{
									color: "white",
									fontSize: "x-large",
									marginLeft: ".5rem",
								}}
							></i>
						</a>
						<a href="">
							{" "}
							<i
								class="fa-brands fa-tiktok"
								style={{
									color: "white",
									fontSize: "x-large",
									marginLeft: ".5rem",
								}}
							></i>
						</a>
						<a href="">
							{" "}
							<i
								class="fa-brands fa-instagram"
								style={{
									color: "white",
									fontSize: "x-large",
									marginLeft: ".5rem",
								}}
							></i>
						</a>
					</div>
				</Row>

				<Nav.Link href="#header">
					<Button className="gototop">
						<i className="fas fa-arrow-up" style={{ color: "white" }}></i>
					</Button>
				</Nav.Link>
			</Container>
		</footer>
	);
}

export default Footer