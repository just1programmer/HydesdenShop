import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	listProducts
} from "../actions/productActions";
import { listOrders } from "../actions/orderActions";
import { listUsers } from '../actions/userActions';
import { Row,Col } from 'react-bootstrap';

import './StatisticsScreen.scss'

const StatisticsScreen = () => {


  const dispatch = useDispatch();
	const navigate = useNavigate();

  //  Produse
	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

  let produseCasti,produseMouse,produseMousepads,produseTastaturi,produseMonitoare,produsePlaci,produseProcesoare,produseInStock,produseOutOfStock;

  // Fiecare categorie 

  function filterByCategory_Casti(obj) {
		return obj.category ===  'Casti';
	}

  function filterByCategory_Mouse(obj) {
    return obj.category ===  'Mouseuri';
  }

  function filterByCategory_Tastaturi(obj) {
    return obj.category ===  'Tastaturi';
  }

  function filterByCategory_Monitoare(obj) {
    return obj.category ===  'Monitoare';
  }

  function filterByCategory_Placi(obj) {
    return obj.category ===  'PlaciVideo';
  }

  function filterByCategory_Mousepads(obj) {
    return obj.category ===  'Mousepaduri';
  }

  function filterByCategory_Procesoare(obj) {
    return obj.category ===  'Procesoare';
  }

  function filterByCategory_Altele(obj) {
    return obj.category ===  'Altele';
  }

  function filterByInStock(obj) {
		return obj.countInStock > 0;
	}

   function filterByOutOfStock(obj) {
			return obj.countInStock <= 0;
		}

  if(!loading){
    produseCasti = products.filter(filterByCategory_Casti);
    produseMonitoare = products.filter(filterByCategory_Monitoare)
    produseMouse = products.filter(filterByCategory_Mouse);
    produseMousepads = products.filter(filterByCategory_Mousepads);
    produsePlaci = products.filter(filterByCategory_Placi);
    produseProcesoare = products.filter(filterByCategory_Procesoare);
    produseTastaturi = products.filter(filterByCategory_Tastaturi);
    produseInStock = products.filter(filterByInStock);
    produseOutOfStock = products.filter(filterByOutOfStock);
    console.log(produseOutOfStock)
  }

  // Comenzi 
  const orderList = useSelector((state) => state.orderList);
	const { orders, loading:loadingOrders, error:errorOrders } = orderList;
  

  //  Useri 

  const userList = useSelector((state) => state.userList);
  const { users, loading:loadingUsers, error:errorUsers } = userList;


  useEffect(() => {
      dispatch(listOrders());
			dispatch(listProducts());
      dispatch(listUsers());
   
	}, [
		dispatch,
		navigate,
	]);


  return (
		<div>
			<Row>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>
							Produse categoria Casti:
							{loading ? "" : produseCasti.length}
						</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>
							Produse categoria Procesoare:{" "}
							{loading ? "" : produseProcesoare.length}
						</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>
							Produse categoria Monitoare:{" "}
							{loading ? "" : produseMonitoare.length}
						</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>
							Produse categoria Mouseuri:{" "}
							{loading ? "" : produseMouse.length}
						</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>
							Produse categoria Placi Video:{" "}
							{loading ? "" : produsePlaci.length}
						</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>
						  Produse categoria Mousepaduri:{" "}
							{loading ? "" : produseMousepads.length}
						</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>
							Produse categoria Tastaturi:{" "}
							{loading ? "" : produseTastaturi.length}
						</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>Total produse : {loading ? "" : products.length}</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>Total useri : {loadingUsers ? "" : users.length}</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>Total comenzi : {loadingOrders ? "" : orders.length}</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>
							Produse in afara stockului :{" "}
							{loading ? "" : produseOutOfStock.length}
						</p>
					</div>
				</Col>
				<Col sm={12} md={12}>
					<div className="statistic">
						<p>
							Produse totale in stock : {loading ? "" : produseInStock.length}
						</p>
					</div>
				</Col>
			</Row>
		</div>
	);
}

export default StatisticsScreen