import React, {useState,useEffect} from 'react' 
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
 
  // Local state
  const [products,setProducts] = useState([]);
 
  // UseEffect pentru call catre Backend
  useEffect(()=>{
    // cream o functie asincrona in UseEffect

    const fetchProducts = async ()=>{
      // primim raspuns de la backend pentru apelul HTTP GET catre URL : /api/products
      const res = await axios.get('/api/products')
      // raspunsul la acest apel are un obiect 'data' care contine datele de care avem nevoie. 
      // setam in state-ul local produsele ce le-am primit.
      setProducts(res.data)
    }

    // Apelam functia fetchProducts
    fetchProducts();
   },[])

  return (
    <>
        <h1>Produsele noastre</h1>
        <Row>
            {products.map(product =>{
                return (
									<Col key={product._id} sm={12} md={6} lg={4} xl={3} >
										<Product product={product} />
									</Col>
								);
            })}
        </Row>
    </>
  )
}

export default HomeScreen