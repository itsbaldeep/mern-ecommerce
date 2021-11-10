// Dependencies
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { loadDirectory } from "redux/actions/directory";

const DirectoryProfileScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, directory } = useSelector((state) => state.directory);

  useEffect(() => {
    dispatch(loadDirectory(match.params.username));
  }, [dispatch, match.params.username]);

  return (
    <Container className="my-2">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        directory && (
          <>
            <p>Name: {directory.storeName}</p>
            <p>Description: {directory.description}</p>
            <p>Tagline: {directory.tagline}</p>
            <p>Address: {directory.address}</p>
            <p>State: {directory.state}</p>
            <p>City: {directory.city}</p>
            <p>
              Features:{" "}
              <ul>
                {directory.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </p>
            <p>
              Details:{" "}
              <ul>
                {directory.details?.map((detail, index) => (
                  <li key={index}>
                    {detail.title}: {detail.content}
                  </li>
                ))}
              </ul>
            </p>
            <p>
              Images:{" "}
              {directory.directoryImages?.map((img, index) => (
                <img key={index} src={img} height="100px" alt="" />
              ))}
            </p>
            <p>Website: {directory.website}</p>
            <p>Joined: {directory.createdAt}</p>
          </>
        )
      )}
    </Container>
  );
};

export default DirectoryProfileScreen;
