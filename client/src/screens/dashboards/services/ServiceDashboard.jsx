// Dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

// Components
import AddService from "./AddService.jsx";
import ServiceCard from "./ServiceCard.jsx";

// Actions
import { getOwnServices } from "redux/actions/service";

// Custom CSS
import "./ServiceDashboard.css";

const ServiceDashboard = () => {
  const dispatch = useDispatch();
  const { loading, services } = useSelector((state) => state.service);

  const [addDialog, setAddDialog] = useState(false);
  const showAddDialog = () => setAddDialog(true);
  const hideAddDialog = () => setAddDialog(false);

  useEffect(() => {
    dispatch(getOwnServices());
  }, [dispatch]);

  return (
    <Container>
      <h2 className="py-2">Your Services</h2>
      <Button onClick={showAddDialog} className="mb-3">
        Add a new service
      </Button>
      <AddService show={addDialog} onHide={hideAddDialog} />
      {loading ? (
        <h1>Loading</h1>
      ) : services.length > 0 ? (
        <Row>
          {services.map((service) => (
            <Col sm={12} md={6} lg={4} key={service._id}>
              <ServiceCard service={service} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>
          You have not added any service yet! <br /> Start by clicking the button above and add your
          very own service
        </p>
      )}
    </Container>
  );
};

export default ServiceDashboard;
