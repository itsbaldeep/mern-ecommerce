import convertTime from "helpers/convertTime";
import { useState } from "react";

const Question = ({ question }) => {
  const isAnswered = question.answers && question.answers.length > 0;
  return (
    <div className="d-flex py-2">
      <div className="px-2">
        <img
          src={question.askedBy.profileImage || "/assets/placeholders/portrait.png"}
          alt=""
          width="60px"
          style={{ borderRadius: "100%" }}
        />
      </div>
      <div className="w-100 px-2">
        <div style={{ height: "30px" }} className="d-flex justify-content-between">
          <div className="d-flex">
            <p className="mb-0">{question.askedBy.name}</p>
          </div>
          <p style={{ fontSize: "0.9rem" }}>{convertTime(question.createdAt)}</p>
        </div>
        <h5 className="mt-0">
          {question.question}
          {isAnswered ? (
            <span className="mx-2 badge bg-success">Answered</span>
          ) : (
            <span className="mx-2 badge bg-danger">Not Answered</span>
          )}
        </h5>
        {!question.answers || question.answers.length === 0 ? (
          <p>No answers yet!</p>
        ) : (
          <div className="product-question-answer">
            {question.answers.map((answer, index) => {
              return (
                <div key={index}>
                  <p className="mb-0">{answer.answer}</p>
                  <p style={{ fontSize: 14 }}>
                    Answered at {convertTime(answer.answeredAt)} by {answer.answeredBy.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
