import React, { useEffect } from 'react'
import HydesDenCarousel from "../components/HydesDenCarousel";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import Location from "../components/Location";
import Partners from "../components/Partners";
import Benefits from "../components/Benefits";
import { listProducts } from "../actions/productActions";

const CategoryScreen = ({categorie}) => {
	const productList = useSelector((state) => state.productList);
	let { loading, error, products } = productList;
    const dispatch = useDispatch();
	products.forEach((product) => {
		console.log(product.category);
	});

	products = products.filter((product) => product.category === categorie);

	// UseEffect pentru call catre Backend
	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);
	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						<HydesDenCarousel />
						<Benefits />
						<h1
							style={{
								color: "rgb(255, 125, 60)",
								textDecoration: "underline",
								textDecorationThickness: "4px",
								textUnderlineOffset: "20px",
							}}
						>
							Produsele noastre
						</h1>
						<h2>Categoria {categorie}</h2>
						<hr />

						{products.map((product) => {
							return (
								<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
									<Product product={product} />
								</Col>
							);
						})}
						<hr />
					</Row>
					<Row>
						<Partners />
						<hr />
					</Row>
					<Row>
						<Location id="#contact" />
					</Row>
				</>
			)}
		</>
	);
}


// folosesc props, si in props dau acolo numele categoriei , si apoi in componenta fac un switch case in care verific ce cuvant am dat
// si daca am dat mouse -- imi apar doar mouseuri, daca dau laptopuri imi apar laptopuri.

export default CategoryScreen