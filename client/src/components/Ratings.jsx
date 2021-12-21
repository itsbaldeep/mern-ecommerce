import convertStars from "helpers/convertStars";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ rating, size, ...props }) => {
  const array = convertStars(rating);
  return (
    <div {...props}>
      {array.map((val, index) => (
        <div key={index} style={{ display: "inline" }}>
          {val === "FULL" ? (
            <FaStar className="text-primary" size={size} />
          ) : val === "HALF" ? (
            <FaStarHalfAlt className="text-primary" size={size} />
          ) : (
            <FaStar className="text-secondary" size={size} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Ratings;
