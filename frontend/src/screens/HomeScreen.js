import React, {useEffect} from 'react' 
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import HydesDenCarousel from '../components/HydesDenCarousel'
 

const HomeScreen = () => {
 

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList;
  // UseEffect pentru call catre Backend
  useEffect(()=>{
    dispatch(listProducts())
   },[dispatch])


  return (
		<>
			<h1>Produsele noastre</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				
				<Row>
					<HydesDenCarousel/>
					{products.map((product) => {
						return (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						);
					})}
				</Row>
			)}
		</>
	);
}

export default HomeScreen