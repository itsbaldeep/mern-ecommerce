// Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

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
import ProfileScreen from "./screens/ProfileScreen.jsx";
import RegisterMemberScreen from "./screens/RegisterMemberScreen.jsx";
import ResetPasswordScreen from "./screens/ResetPasswordScreen.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const refetch = () =>
      localStorage.getItem(process.env.REACT_APP_TOKEN_NAME) && dispatch(loadUser());
    window.addEventListener("storage", refetch());
    return () => {
      window.removeEventListener("storage");
    };
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/resetpassword" component={ResetPasswordScreen} />
        <Route exact path="/register/member" component={RegisterMemberScreen} />
        <Route exact path="/verify/:verifyToken" component={VerifyAccountScreen} />
        <PrivateRoute exact path="/profile" component={ProfileScreen} />
      </Switch>
    </Router>
  );
}

export default App;
