// Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Actions
import { loadUser } from "./redux/actions/user.js";

// Components
import PrivateRoute from "./components/PrivateRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Main Screens
import HomeScreen from "./screens/HomeScreen.jsx";
import ShopScreen from "./screens/shop/ShopScreen.jsx";
import ProductScreen from "./screens/shop/ProductScreen.jsx";
import ServicesScreen from "./screens/services/ServicesScreen.jsx";
import ServiceScreen from "screens/services/ServiceScreen.jsx";
import NGOScreen from "./screens/NGOScreen.jsx";

// Directory Screens
import DirectoriesScreen from "./screens/directory/DirectoriesScreen.jsx";
import DirectoryProfileScreen from "./screens/directory/DirectoryProfileScreen.jsx";

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

// Dashboard Screens
import ProductDashboard from "./screens/dashboards/products/ProductDashboard.jsx";
import ServiceDashboard from "./screens/dashboards/services/ServiceDashboard.jsx";
import AdminDashboard from "./screens/dashboards/admin/AdminDashboard.jsx";

function App() {
  // Checking for user token
  const dispatch = useDispatch();
  useEffect(() => {
    const listener = window.addEventListener("storage", (() => dispatch(loadUser()))());
    return () => window.removeEventListener("storage", listener);
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Switch>
        {/* Main Routes */}
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/shop" component={ShopScreen} />
        <Route exact path="/shop/:productId" component={ProductScreen} />
        <Route exact path="/services" component={ServicesScreen} />
        <Route exact path="/services/:serviceId" component={ServiceScreen} />
        <Route exact path="/ngo" component={NGOScreen} />

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
        <PrivateRoute exact path="/account/services" component={ServiceDashboard} />
        <PrivateRoute exact path="/admin" isAdmin component={AdminDashboard} />

        {/* Custom directory URL routes, must be at the end */}
        <Route path="/directories" component={DirectoriesScreen} />
        <Route path="/:username" component={DirectoryProfileScreen} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
