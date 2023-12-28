import { Badge, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { FaWolfPackBattalion } from "react-icons/fa6";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux'

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () =>  {

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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header