import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { FaWolfPackBattalion } from "react-icons/fa6";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
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
              <LinkContainer to="/cart">
                <Nav.Link><FaShoppingCart />&nbsp; Cart</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link><FaUser />&nbsp; Sign In</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header