import { FaInfoCircle, FaShoppingCart, FaStar, FaStarHalfAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const date = new Date(product.createdAt);
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const added = `${day}/${month}/${year}`;

  return (
    <div className="product-item py-2 px-1">
      <Link to={`/shop/${product._id}`}>
        <div
          className="product-img"
          style={{
            backgroundImage: `url(${
              product.productImages[0] || "/assets/placeholders/product.png"
            })`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "250px",
          }}
        ></div>
      </Link>
      <div className="product-details py-3">
        <Link to={`/shop/${product._id}`}>
          <h4>{product.name}</h4>
        </Link>
        <div className="category">
          <FaTag className="text-primary" /> {product.category}
        </div>
        <div className="ratings">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <div className="price">₹{product.price}</div>
        <div className="added">Added on: {added}</div>
        <div className="d-flex justify-content-around">
          <div className="product-button my-2">
            <Link to={`/shop/${product._id}`} className="btn btn-primary btn-sm">
              <FaInfoCircle /> More Details
            </Link>
          </div>
          <div className="product-button my-2">
            <button className="btn btn-primary btn-sm">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
