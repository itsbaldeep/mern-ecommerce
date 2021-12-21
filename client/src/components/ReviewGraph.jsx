import Ratings from "components/Ratings";
import { Row, Col } from "react-bootstrap";

const ReviewGraph = ({ ratings = {}, total = 0, average = 0, ...props }) => {
  return (
    <div {...props}>
      <div>
        User Rating:
        <Ratings rating={average} size={20} className="d-inline px-2" />
      </div>
      <p>
        {average} average rating based on {total} review(s)
      </p>
      {Object.keys(ratings).map((key, index) => {
        const value = ratings[key];
        return (
          <Row key={index} className="my-2" style={{ maxWidth: "500px" }}>
            <Col xs={3} className="text-center">
              {key} star
            </Col>
            <Col xs={8}>
              <div className="bg-light h-100 position-relative">
                <div
                  className="bg-primary h-100 position-absolute top-0"
                  style={{ width: `${(value / total) * 100}%` }}
                ></div>
              </div>
            </Col>
            <Col xs={1}>{value}</Col>
          </Row>
        );
      })}
    </div>
  );
};

export default ReviewGraph;
