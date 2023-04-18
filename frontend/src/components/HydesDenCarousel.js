import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import c1 from './c1.jpeg';
import c2 from "./c2.jpeg";
import c3 from "./c3.jpeg";
import c4 from "./c4.jpeg";
import './HydesDenCarousel.scss'


const HydesDenCarousel = () => {

  return (
		<Carousel pause="hover" className="bg-light fixheight">
			<Carousel.Item>
				<img src={c1} alt="carousel1" className="image" fluid />
				<Carousel.Caption className="carousel-caption">Poti gasi relaxarea impreuna cu HydesDen</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img src={c2} alt="carousel2" className="image" fluid />
				<Carousel.Caption className="carousel-caption">Builduri PC custom</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img src={c3} alt="carousel3" className="image" fluid />
				<Carousel.Caption className="carousel-caption">Casti,tastaturi,mouse-uri pentru profesionisti</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img src={c4} alt="carousel4" className="image" fluid />
				<Carousel.Caption className="carousel-caption">
                    Gaming at its finest
                </Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}

export default HydesDenCarousel