import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import Message from "../components/Message";

const CartScreen = () => {

    const navigate = useNavigate();

    // const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

  return (
    <div>CartScreen</div>
  )
}

export default CartScreen