import { Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Pagination from "../components/Pagination";
import { useGetProductsQuery } from "../slices/productsApiSlice";


const HomeScreen = () => {

  const { pageNumber, keyword } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({ pageNumber, keyword });

  return (
    <>
      { keyword && <Link to='/' className='btn btn-light mb-4'>Go Back</Link> }
      {isLoading ? (
        <Loader />
      ): isError ? (
        <Message variant='danger'>{isError?.data?.message || isError.error}</Message>
      ) : (
      <>
        <h1>Latest Products</h1>
        <Row>
          {data.products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Pagination 
          pages={data.pages}
          page={data.page}
          keyword={keyword ? keyword : ''}
        />
      </>
    ) }

    </>
  )
}

export default HomeScreen