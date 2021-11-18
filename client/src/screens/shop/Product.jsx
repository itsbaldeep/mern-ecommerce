import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-item py-2 px-1">
      <div
        className="product-img"
        style={{
          backgroundImage: `url(${product.productImages[0] || "/assets/placeholders/product.png"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "250px",
        }}
      ></div>
      <div className="product-details py-3">
        <h4>{product.name}</h4>
        <div className="ratings">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <div className="price">₹{product.price}</div>
        <div className="product-button my-2">
          <Link exact to={`/shop/${product._id}`} className="btn btn-primary btn-sm">
            More Details
          </Link>
        </div>
        <div className="product-button my-2">
          <button className="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
