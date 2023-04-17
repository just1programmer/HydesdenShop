import {Container} from 'react-bootstrap'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeScreen />,
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
]);

function App() {
  return (
		<>
			<Header />
			<main className="py-3">
				<Container>
					<RouterProvider router={router}/>
				</Container>
			</main>
			<Footer />
		</>
	);
}


export default App;
