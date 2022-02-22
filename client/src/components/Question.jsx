import convertTime from "helpers/convertTime";

const Question = ({ question }) => {
  return (
    <div className="d-flex py-2">
      <div className="product-question-image px-2">
        <img
          src={question.askedBy.profileImage || "/assets/placeholders/portrait.png"}
          alt=""
          width="60px"
        />
      </div>
      <div className="product-question-content px-2">
        <div className="product-question-meta d-flex justify-content-between">
          <div className="d-flex">
            <p>{question.askedBy.name}</p>
          </div>
          <p style={{ fontSize: "0.9rem" }}>{convertTime(question.createdAt)}</p>
        </div>
        <h5>{question.question}</h5>
      </div>
    </div>
  );
};

export default Question;
