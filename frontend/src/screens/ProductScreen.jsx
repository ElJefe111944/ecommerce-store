import { useParams } from "react-router";
import products from "../products";

const ProductScreen = () => {

    const { id:productId } = useParams();
    const product = products.find((product) => product._id === productId);

    console.log(product);

  return (
    <div>

    </div>
  )
}

export default ProductScreen