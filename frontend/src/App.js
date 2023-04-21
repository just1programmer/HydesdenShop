import {Container} from 'react-bootstrap'
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import SplitScreenSelection from './screens/SplitScreenSelection';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ContactScreen from './screens/ContactScreen'
import Location from './components/Location';
import OrderListScreen from './screens/OrderListScreen';
import BenefitsScreen from './screens/BenefitsScreen';
import StatisticsScreen from './screens/StatisticsScreen';

const router = createBrowserRouter([
	{
		path: "/home",
		element: <HomeScreen />,
	},

	{
		path: "/contact",
		element: <ContactScreen />,
	},

	{
		path: "/product/:id",
		element: <ProductScreen />,
	},
	{
		path: "/cart/:id?",
		element: <CartScreen />,
	},
	{
		path: "/login",
		element: <LoginScreen />,
	},
	{
		path: "/register",
		element: <RegisterScreen />,
	},
	{
		path: "/profile",
		element: <ProfileScreen />,
	},

	{
		path: "/shipping",
		element: <ShippingScreen />,
	},

	{
		path: "/payment",
		element: <PaymentScreen />,
	},

	{
		path: "/placeorder",
		element: <PlaceOrderScreen />,
	},

	{
		path: "/order/:id",
		element: <OrderScreen />,
	},

	{
		path: "/admin/userlist",
		element: <UserListScreen />,
	},

	{
		path: "/admin/product/:id/edit",
		element: <ProductEditScreen />,
	},
	{
		path: "/admin/productlist",
		element: <ProductListScreen />,
	},

	{
		path: "/location",
		element: <Location />,
	},

	{
		path: "/admin/orderlist",
		element: <OrderListScreen />,
	},

	{
		path: "/admin/statistics",
		element: <StatisticsScreen />,
	},

	{
		path: "/benefits",
		element: <BenefitsScreen />,
	},
]);

function App() {

	
  return (
		<>
			{window.location.href === "http://localhost:3000/" ? (
				<SplitScreenSelection />
			) : (
				<>
					<Header />
					<main className="py-3">
						<Container id="header">
							<RouterProvider router={router} />
						</Container>
					</main>
					<Footer />
				</>
			)}
		</>
	);
}


export default App;
