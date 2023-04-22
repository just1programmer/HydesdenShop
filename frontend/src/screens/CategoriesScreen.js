import React, { useEffect, useState } from 'react'
import './CategoriesScreen.scss'
import {Row,Col} from 'react-bootstrap'
import CategoryScreen from './CategoryScreen';



const CategoriesScreen = () => {
  
	const [isSelectedCategory,setIsSelectedCategory] = useState(false);
	const [category,setCategory] = useState('')


	useEffect(()=>{

	})

	return (
		<>
			{isSelectedCategory ? (
				<CategoryScreen categorie={category} />
			) : (
				<>
					<Row>
						<Col sm={12} md={4}>
							<h2>Casti</h2>
							<div
								className="category casti"
								onClick={() => {
									setCategory("Casti");
									setIsSelectedCategory(true);
								}}
							></div>
						</Col>
						<Col sm={12} md={4}>
							<h2>Monitoare</h2>
							<div
								className="category monitoare"
								onClick={() => {
									setCategory("Monitoare");
									setIsSelectedCategory(true);
								}}
							></div>
						</Col>
						<Col sm={12} md={4}>
							<h2>Mouseuri</h2>
							<div
								className="category mouse"
								onClick={() => {
									setCategory("Mouseuri");
									setIsSelectedCategory(true);
								}}
							></div>
						</Col>
						<Col sm={12} md={4}>
							<h2>Mousepaduri</h2>
							<div
								className="category mousepad"
								onClick={() => {
									setCategory("Mousepaduri");
									setIsSelectedCategory(true);
								}}
							></div>
						</Col>
						<Col sm={12} md={4}>
							<h2>Placi video</h2>
							<div
								className="category placivideo"
								onClick={() => {
									setCategory("PlaciVideo");
									setIsSelectedCategory(true);
								}}
							></div>
						</Col>
						<Col sm={12} md={4}>
							<h2>Tastaturi</h2>
							<div
								className="category tastaturi"
								onClick={() => {
									setCategory("Tastaturi");
									setIsSelectedCategory(true);
								}}
							></div>
						</Col>
						<Col sm={12} md={4}>
							<h2>Procesoare</h2>
							<div
								className="category procesoare"
								onClick={() => {
									setCategory("Procesoare");
									setIsSelectedCategory(true);
								}}
							></div>
						</Col>
						<Col sm={12} md={4}>
							<h2>Altele</h2>
							<div
								className="category altele"
								onClick={() => {
									setCategory("Altele");
									setIsSelectedCategory(true);
								}}
							></div>
						</Col>
					</Row>
					<Row></Row>
				</>
			)}
		</>
	);
}

export default CategoriesScreen