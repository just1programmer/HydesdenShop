import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavDropdown} from 'react-bootstrap'
import {logout} from '../actions/userActions'
import logo from './Logoz.png'
import "./Header.scss"


const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  
  const logoutHandler = () =>{
	dispatch(logout())
  }

  return (
		<header>
			<Navbar className="header" expand="lg" collapseOnSelect>
				<Container>
					<Navbar.Brand href="/">
						<img src={logo} alt="" className="logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Link className="links" href="/cart">
								<i className="fas fa-shopping-cart"></i> Cart
							</Nav.Link>
							{userInfo ? (
								<NavDropdown

									className='nav-dropdown'
									title={
										<span className="nav-dropdown-text">
											{userInfo.name}
										</span>
									}
									id="username"
								>
									<Nav.Link href="/profile">
										<NavDropdown.Item>Profil</NavDropdown.Item>
									</Nav.Link>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Nav.Link className="links" href="/login">
									<i className="fas fa-user"></i> Sign In
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header