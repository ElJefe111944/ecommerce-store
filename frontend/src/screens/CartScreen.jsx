import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";

const CartScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const numberOfItemsInCart = () => {
        return cartItems.reduce((acc, item) => acc + item.qty, 0);
    };

    const addToCartHandler = async(product, qty) => {
        dispatch(addToCart({...product, qty}))
    };

    return (
        <Row>
            {/*  SUMMARY OF ITEMS IN CART  */}
            <Col md={8}>
                <h1 style={{
                    marginBottom: '20px'
                }}>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>
                                        £{item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => addToCartHandler(item, Number(e.target.value))
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((stockItem) => (
                                                <option key={stockItem + 1} value={stockItem + 1}>
                                                    {stockItem + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="white">
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            {/* SUMMARY OF PRICE & CHECKOUT CTA */}
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({numberOfItemsInCart()} {numberOfItemsInCart() > 1 ? "items" : "item"})</h2>
                            £{ cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2) }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={ cartItems.length === 0 }>
                                Proceed to checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen