import convertTime from "helpers/convertTime";
import Ratings from "./Ratings";

const Review = ({ review }) => {
  return (
    <div className="d-flex py-2">
      <div className="px-2">
        <img
          src={review.reviewer.profileImage || "/assets/placeholders/portrait.png"}
          alt=""
          width="60px"
          style={{ borderRadius: "100%" }}
        />
      </div>
      <div className="w-100 px-2">
        <div style={{ height: "20px" }} className="d-flex justify-content-between">
          <div>
            <p className="mb-0">{review.reviewer.name}</p>
          </div>
          <p style={{ fontSize: "0.9rem" }}>{convertTime(review.createdAt)}</p>
        </div>
        <Ratings rating={review.rating} size={15} />
        <h5>{review.subject}</h5>
        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default Review;
