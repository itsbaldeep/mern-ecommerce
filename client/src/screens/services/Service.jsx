import { FaInfoCircle, FaShoppingCart, FaStar, FaStarHalfAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";

const Service = ({ service }) => {
  const date = new Date(service.createdAt);
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const added = `${day}/${month}/${year}`;

  return (
    <div className="service-item py-2 px-1">
      <Link to={`/shop/${service._id}`}>
        <div
          className="service-img"
          style={{
            backgroundImage: `url(${
              service.serviceImages?.[0] || "/assets/placeholders/service.png"
            })`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "250px",
          }}
        ></div>
      </Link>
      <div className="service-details py-3">
        <Link to={`/services/${service._id}`}>
          <h4>{service.name}</h4>
        </Link>
        <div className="category">
          <FaTag className="text-primary" /> {service.category}
        </div>
        <div className="ratings">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <div className="price">₹{service.price}</div>
        <div className="added">Added on: {added}</div>
        <div className="d-flex justify-content-around">
          <div className="service-button my-2">
            <Link to={`/services/${service._id}`} className="btn btn-primary btn-sm">
              <FaInfoCircle /> More Details
            </Link>
          </div>
          <div className="service-button my-2">
            <button className="btn btn-primary btn-sm">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
