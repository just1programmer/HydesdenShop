import React from 'react'
import { Container,Row,Col } from "react-bootstrap";
import './Footer.scss' 

const Footer = () => {
  return (
    <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; Hyde's Den 2023
                    </Col>
                </Row>
            </Container>
    </footer>
  )
}

export default Footer