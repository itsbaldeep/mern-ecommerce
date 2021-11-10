// Dependencies
import { useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import { loadDirectories } from "redux/actions/directory";

const DirectoriesScreen = () => {
  const dispatch = useDispatch();
  const { loading, directories } = useSelector((state) => state.directory);

  useEffect(() => {
    dispatch(loadDirectories());
  }, [dispatch]);

  return (
    <Container className="my-2">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Row>
          {directories.map((directory, index) => (
            <Col md={3} sm={6} xs={12}>
              <DirectoryCard directory={directory} key={index} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

const DirectoryCard = ({ directory }) => {
  return (
    <Card className="text-center">
      <Card.Header>{directory.storeName}</Card.Header>
      <Card.Img variant="top" src={directory.directoryImages[0]} />
      <Card.Body>
        <Card.Title>{directory.tagline}</Card.Title>
        <Card.Text>{directory.description}</Card.Text>
        <Link to={`/${directory.username}`}>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
};

export default DirectoriesScreen;
