import React from 'react' 
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = ({match}) => {

  // folosim useParams ca sa luam parametrul din URL
  let {id} = useParams();
  // luam produsul cu id din URL
  const product = products.find(product => product._id ===id)

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
              <ListGroup.Item> <h2>{product.name}</h2> </ListGroup.Item>
              <ListGroup.Item> <Rating value={product.rating} text={`${product.numReviews} reviews`} /> </ListGroup.Item>
              <ListGroup.Item> <h2>Price: ${product.price}</h2> </ListGroup.Item>
              <ListGroup.Item> <p>{product.description}</p> </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    {product.countInStock >0? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn w-100' type='button' disabled={product.countInStock === 0}>Add to cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen