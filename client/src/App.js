// Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

// Actions
import { loadUser } from "./redux/actions/user.js";

// Components
import PrivateRoute from "./components/PrivateRoute.jsx";
import Navbar from "./components/Navbar.jsx";

// Screens
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import VerifyAccountScreen from "./screens/VerifyAccountScreen.jsx";
import AccountScreen from "./screens/AccountScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import RegisterMemberScreen from "./screens/RegisterMemberScreen.jsx";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen.jsx";
import ResetPasswordScreen from "./screens/ResetPasswordScreen.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const refetch = () =>
      localStorage.getItem(process.env.REACT_APP_TOKEN_NAME) && dispatch(loadUser());
    const listener = window.addEventListener("storage", refetch());
    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/verify/:verifyToken" component={VerifyAccountScreen} />
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
        <Route exact path="/resetpassword/:resetToken" component={ResetPasswordScreen} />
        <Route exact path="/register/member" component={RegisterMemberScreen} />
        <PrivateRoute exact path="/account" component={AccountScreen} />
        <PrivateRoute exact path="/account/profile" component={ProfileScreen} />
      </Switch>
    </Router>
  );
}

export default App;
