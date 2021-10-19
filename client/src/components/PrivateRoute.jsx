import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) return <Redirect to="/" />;
            if (isAdmin && user.role !== "Admin") return <Redirect to="/" />;
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default PrivateRoute;
