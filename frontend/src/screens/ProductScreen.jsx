import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {

    const { id:productId } = useParams();
    
    const { data: product, isLoading, isError } = useGetProductDetailsQuery(productId);
    
  return (
    <>
        <Link className="btn btn-light my-3" to="/">Go Back</Link>
        { isLoading ? (
            <Loader />
        ) : isError ? (
            <Message variant='danger'>{isError?.data?.message || isError.error}</Message>
        ) : (
                    <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: £{product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                Description: {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>
                                        <strong>£{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>
                                        <strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                    </Col>
                </Row>
        ) }

    </>
  )
}

export default ProductScreen