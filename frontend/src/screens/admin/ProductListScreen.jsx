import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Pagination from '../../components/Pagination';
import { toast } from "react-toastify";
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';

const ProductListScreen = () => {

    const { pageNumber } = useParams();

    const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (productId) => {
        if (window.confirm('Are you sure you want to Delete this product?')) {
            try {
                await deleteProduct(productId);
                refetch();
                toast.success('Product successfully deleted');
            } catch (error) {
                toast.error(error?.data?.message || error?.error);
            };
        };
    }

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct();
                refetch();
                toast.success('Product successfully created');
            } catch (error) {
                toast.error(error?.data?.message || error?.error);
            };
        }
    };


    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createProductHandler}>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message}</Message> : (
                <>
                    <Table striped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button className="btn-sm mx-2" variant="light">
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(product._id)}>
                                            <FaTrash style={{ color: 'white' }} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination
                        pages={data.pages}
                        page={data.page}
                        isAdmin={true}
                    />
                </>
            )}
        </div>
    )
}


export default ProductListScreen