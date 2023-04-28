import React, { useEffect, useRef } from 'react' 
import './SplitScreenSelection.scss'
import shopClip from './shopClip.mp4'
import gamingClub from './gamingClub.mp4'
import { Link } from 'react-router-dom'


const SplitScreenSelection = () => {

     const stopMovie = (e) => {
				e.target.pause();
				console.log("off");
			};

	  const playMovie = (e) => {
				e.target.play();
				console.log("on");
			};
    


    return (
			<div className="selection">
				<div className="left-screen">
					<video
						src={shopClip}
						onMouseOver={playMovie}
						onMouseOut={stopMovie}
						loop
						muted
					></video>

					<div className="goto">
						<h1>
							{" "}
							<a href="/" className="selection-link">
								Spre Magazin
							</a>
						</h1>
					</div>
				</div>

				<div className="right-screen">
					<video
						src={gamingClub}
						onMouseOver={playMovie}
						onMouseOut={stopMovie}
						loop
						muted
					></video>

					<div className="goto">
						<h1>
							{" "}
							<a href="https://net-cafe.vercel.app/" className="selection-link">
								Spre sala de jocuri
							</a>
						</h1>
					</div>
				</div>
			</div>
		);
}

export default SplitScreenSelection