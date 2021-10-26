// Dependencies
import { useEffect } from "react";
import { Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { verify } from "redux/actions/user";

const VerifyAccountScreen = ({ match }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => dispatch(verify(match.params.verifyToken)), [dispatch, match.params.verifyToken]);

  return (
    <Container
      className="text-center"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!user.loading &&
        (user.isVerified ? (
          <h1>Your account has been verified successfully.</h1>
        ) : (
          <h1>Your account verification token is invalid.</h1>
        ))}
      <LinkContainer exact to="/">
        <Nav.Link>Go back to the home page</Nav.Link>
      </LinkContainer>
    </Container>
  );
};

export default VerifyAccountScreen;
