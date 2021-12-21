import convertTime from "helpers/convertTime";
import Ratings from "./Ratings";

const Review = ({ review }) => {
  return (
    <div className="d-flex py-2">
      <div className="dir-review-image px-2">
        <img
          src={review.reviewer.profileImage || "/assets/placeholders/portrait.png"}
          alt=""
          width="60px"
        />
      </div>
      <div className="dir-review-content px-2">
        <div className="dir-review-meta d-flex justify-content-between">
          <div className="d-flex">
            <p>{review.reviewer.name}</p>
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
