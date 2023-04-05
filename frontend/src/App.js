import {Container} from 'react-bootstrap'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
 

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
		path: "/cart",
		element: <CartScreen/>,
	},
	{
		path: "/login",
		element: <LoginScreen />,
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
