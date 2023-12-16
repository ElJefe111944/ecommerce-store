import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import Message from "../components/Message";

const CartScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

  return (
    <Row>
        <Col md={8}>
            <h1 style={{
                marginBottom: '20px'
            }}>Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
            ) : (
                <ListGroup variant="flush">
                    Items
                </ListGroup>
            )}
        </Col>
    </Row>
  )
}

export default CartScreen