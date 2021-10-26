import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import { getProducts, addProduct, removeProduct } from "redux/actions/product";

const ProductDashboard = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  let list = [];

  useEffect(() => {
    dispatch(getProducts());
    if (!loading) list = products.filter((product) => product.seller === user._id);
  }, [dispatch]);

  console.log(list);
  return <Container></Container>;
};

export default ProductDashboard;
