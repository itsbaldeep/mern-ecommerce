import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("petohubAuthToken") ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/login"></Redirect>
                )
            }
        />
    );
};

export default PrivateRoute;
