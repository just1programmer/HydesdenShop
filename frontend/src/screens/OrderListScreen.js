import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function compareCreatedAt(a, b) {
		return b.createdAt - a.createdAt;
	}

	const orderList = useSelector((state) => state.orderList);
	const { orders, loading, error } = orderList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if(orders){
	orders.reverse();
	}

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		
		} else {
			navigate("/login");
		}
	}, [dispatch, navigate, userInfo]);

	return (
		<>
			<h1>Comenzi</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table variant="dark" bordered hovered responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>UTILIZATOR</th>
							<th>DATA</th>
							<th>PRET</th>
							<th>PLATIT</th>
							<th>EXPEDIAT</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.sort(compareCreatedAt).map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>lei {order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<Link to={`/order/${order._id}`}>
										<Button variant="light" className="btn-sm">
											Detalii
										</Button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
