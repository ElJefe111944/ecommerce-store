import { useNavigate } from 'react-router';
import { Badge, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { FaWolfPackBattalion } from "react-icons/fa6";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from "../slices/authSlice";
import { resetCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ logOutApiCall ] = useLogoutMutation();

  const logoutHandler = async () =>  {
    try {
      await logOutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="white" data-bs-theme="white" variant="white" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <FaWolfPackBattalion />&nbsp;EncantoCasa
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer style={{
                display: 'flex',
                alignItems: 'center',
              }} to="/cart">
                <Nav.Link>
                  <FaShoppingCart />&nbsp; Cart
                  {cartItems.length > 0 && (
                    <Badge style={{ marginLeft: '5px' }} pill bg='black'>{cartItems.reduce((acc, current) => acc + current.qty, 0)}</Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'> 
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                    </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link><FaUser />&nbsp; Sign In</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header