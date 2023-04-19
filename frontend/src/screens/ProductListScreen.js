import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table,Image, Button,Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteProduct, listProducts,createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";


const ProductListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

    const productDelete = useSelector((state) => state.productDelete);
	const {loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete;

       const productCreate = useSelector((state) => state.productCreate);
				const {
					loading: loadingCreate,
					error: errorCreate,
					success: successCreate,
                    product:createdProduct
				} = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;




	useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
		if (!userInfo.isAdmin) {
				navigate("/login");
		} 

        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else{
            dispatch(listProducts());
        }
     
	}, [dispatch, navigate, userInfo,successDelete,successCreate,createProduct]);



    	const deleteHandler = (id) => {
				if (window.confirm("Esti sigur ca vrei sa stergi produsul?")) {
					dispatch(deleteProduct(id));
                }
			};


        const createProductHandler = () => {
            dispatch(createProduct())
        }

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Produse</h1>
				</Col>
				<Col className="text-end">
					<Button className="my-3" onClick={createProductHandler}>
						{" "}
						<i className="fas fa-plus"></i> Creeaza produs
					</Button>
				</Col>
			</Row>
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{errorCreate}</Message>}
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table   variant="dark" bordered hovered responsive className="table-sm">
					<thead>
						<tr>
							<th>POZA</th>
							<th>ID</th>
							<th>NUME PRODUS</th>
							<th>PRET</th>
							<th>CATEGORIE</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>
									<Image src={product.image} rounded fluid />
								</td>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>lei {product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<Link to={`/admin/product/${product._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i>
										</Button>
									</Link>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => {
											deleteHandler(product._id);
										}}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ProductListScreen;
