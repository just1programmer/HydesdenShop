import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import Rating from './Rating';
import './Product.scss';
const Product = ({product}) => {
  return (
		<Link to={`/product/${product._id}`} className='link'>
			<Card className="my-3 p-3 rounded product">
				<Card.Img src={product.image} variant="top" />
				<Card.Body>
						<Card.Title as="div" >
							<strong>{product.name}</strong>
						</Card.Title>
					<Card.Text as="div">
						<Rating
							value={product.rating}
							text={`${product.numReviews} reviews`}
						/>
					</Card.Text>
					<Card.Text as="h3">{product.price} Lei</Card.Text>
				</Card.Body>
			</Card>
		</Link>
	);
}

export default Product