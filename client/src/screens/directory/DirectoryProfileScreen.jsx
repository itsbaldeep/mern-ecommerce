// Dependencies
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination } from "swiper";

// Actions
import { loadDirectory } from "redux/actions/directory";

const DirectoryProfileScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, directory } = useSelector((state) => state.directory);

  useEffect(() => {
    dispatch(loadDirectory(match.params.username));
  }, [dispatch, match.params.username]);

  const date = new Date(directory.createdAt);
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const joined = `${day}/${month}/${year}`;

  return (
    <Container className="py-3 mt-3">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Row>
          <Col xs={12} md={6}>
            {directory.directoryImages?.length > 0 ? (
              <Swiper
                loop
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation
              >
                {directory.directoryImages?.map((image, index) => (
                  <SwiperSlide
                    style={{ height: "450px" }}
                    className="d-flex justify-content-center align-items-center"
                    key={index}
                  >
                    <img src={image} key={index} width="300px" alt="" className="my-auto" />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img src="/assets/placeholders/store.png" alt="Store" />
            )}
          </Col>
          <Col xs={12} md={6} className="pt-3">
            <h3>{directory.storeName}</h3>
            <h4>About this directory</h4>
            <p>{directory.description || "No information available"}</p>
            {directory.tagline && <p>Tagline: {directory.tagline}</p>}

            <p>Address: {directory.address}</p>
            <p>State: {directory.state}</p>
            <p>City: {directory.city}</p>
            <p>Joined: {joined}</p>
            {directory.website && (
              <a
                href={directory.website}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Visit them
              </a>
            )}
          </Col>
          {directory.features.length > 0 && (
            <div className="features">
              <h3>Features</h3>
              <ul>
                {directory.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          {directory.details.length > 0 && (
            <div className="details">
              <h3>Details</h3>
              <ul>
                {directory.details?.map((detail, index) => (
                  <li key={index}>
                    {detail.title}: {detail.content}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default DirectoryProfileScreen;
