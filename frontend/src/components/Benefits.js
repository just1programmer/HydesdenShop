import React from 'react'
import diferenta from './2x_diferenta.svg'
import protejeaza from './protejeaza_investitia.svg'
import retur from './retur_in_30_de_zile.svg'
import transport from './transport_pana_la_usa.svg'
import './Benefits.scss'
import { useNavigate } from 'react-router-dom'

const Benefits = () => {
  
    const navigate = useNavigate();
  
    return (
		<>
			<div className="benefits" onClick={()=>{
                navigate('/benefits')
            }}>
				<img src={transport} alt="" />
				<img src={retur} alt="" />
				<img src={diferenta} alt="" />
				<img src={protejeaza} alt="" />
			</div>
			<div className="benefits-p">
				<p>Transport la orice produs</p>
				<p>Te-ai razgandit? Poti returna produsul in 14 zile</p>
				<p>Primesti de 2 ori diferenta la orice produs</p>
				<p>Protejeaza-ti investitia cu extragarantie</p>
			</div>
		</>
	);
}

export default Benefits