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
import Footer from "./components/Footer.jsx";

// Screens
import HomeScreen from "./screens/HomeScreen.jsx";
import ShopScreen from "./screens/shop/ShopScreen.jsx";

// Auth Screens
import LoginScreen from "./screens/auth/LoginScreen.jsx";
import RegisterScreen from "./screens/auth/RegisterScreen.jsx";
import RegisterMemberScreen from "./screens/auth/RegisterMemberScreen.jsx";
import VerifyAccountScreen from "./screens/auth/VerifyAccountScreen.jsx";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen.jsx";
import ResetPasswordScreen from "./screens/auth/ResetPasswordScreen.jsx";

// Account Screens
import AccountScreen from "./screens/AccountScreen.jsx";
import ProfileScreen from "./screens/profile/ProfileScreen.jsx";

// Client Dashboard Screens
import ProductDashboard from "./screens/shop/ProductDashboard.jsx";
import ServicesDashboard from "./screens/services/ServicesDashboard.jsx";

function App() {
  // Checking for user token
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
        {/* Home Route */}
        <Route exact path="/" component={HomeScreen} />

        {/* Main Routes */}
        <Route path="/shop" component={ShopScreen} />

        {/* Auth Routes */}
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/verify/:verifyToken" component={VerifyAccountScreen} />
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
        <Route exact path="/resetpassword/:resetToken" component={ResetPasswordScreen} />
        <Route exact path="/register/member" component={RegisterMemberScreen} />

        {/* Account Routes */}
        <PrivateRoute exact path="/account" component={AccountScreen} />
        <PrivateRoute exact path="/account/profile" component={ProfileScreen} />
        <PrivateRoute exact path="/account/products" component={ProductDashboard} />
        <PrivateRoute exact path="/account/services" component={ServicesDashboard} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
