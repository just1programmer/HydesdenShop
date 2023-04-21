import React from 'react'
import './CategoriesScreen.scss'
import {Row,Col} from 'react-bootstrap'
const CategoriesScreen = () => {
  return (
		<>
			<Row>
				<Col sm={12} md={4}>
					<h2>Casti</h2>
					<div className="category casti"></div>
				</Col>
				<Col sm={12} md={4}>
					<h2>Monitoare</h2>
					<div className="category monitoare"></div>
				</Col>
				<Col sm={12} md={4}>
					<h2>Mouseuri</h2>
					<div className="category mouse"></div>
				</Col>
				<Col sm={12} md={4}>
					<h2>Mousepaduri</h2>
					<div className="category mousepad"></div>
				</Col>
				<Col sm={12} md={4}>
					<h2>Placi video</h2>
					<div className="category placivideo"></div>
				</Col>
				<Col sm={12} md={4}>
					<h2>Tastaturi</h2>
					<div className="category tastaturi"></div>
				</Col>
				<Col sm={12} md={4}>
					<h2>Procesoare</h2>
					<div className="category procesoare"></div>
				</Col>
				<Col sm={12} md={4}>
					<h2>Altele</h2>
					<div className="category altele"></div>
				</Col>
			</Row>
			<Row></Row>
		</>
	);
}

export default CategoriesScreen