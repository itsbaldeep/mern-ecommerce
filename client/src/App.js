// Libraries
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Actions
import { getBrands } from "redux/actions/brand.js";
import {
  getCategories,
  getDirectoryCategories,
  getProductCategories,
  getServiceCategories,
} from "redux/actions/category.js";
import { getPets } from "redux/actions/pet.js";
import { loadUser } from "redux/actions/user.js";

// Components
import Footer from "components/Footer.jsx";
import Navbar from "components/Navbar.jsx";
import PrivateRoute from "components/PrivateRoute.jsx";
import ScrollToTop from "components/ScrollToTop.jsx";

// Main Screens
import AboutScreen from "screens/AboutScreen.jsx";
import ContactScreen from "screens/ContactScreen.jsx";
import HomeScreen from "screens/HomeScreen.jsx";
import ServiceScreen from "screens/services/ServiceScreen.jsx";
import ServicesScreen from "screens/services/ServicesScreen.jsx";

// Shop Screens
import BrandScreen from "screens/shop/BrandScreen.jsx";
import CategoryScreen from "screens/shop/CategoryScreen.jsx";
import PetScreen from "screens/shop/PetScreen.jsx";
import ProductScreen from "screens/shop/ProductScreen.jsx";
import SearchResultsScreen from "screens/shop/SearchResultsScreen.jsx";
import ShopScreen from "screens/shop/ShopScreen.jsx";

// Directory Screens
import DirectoriesScreen from "screens/directory/DirectoriesScreen.jsx";
import DirectoryProfileScreen from "screens/directory/DirectoryProfileScreen.jsx";

// Auth Screens
import ForgotPasswordScreen from "screens/auth/ForgotPasswordScreen.jsx";
import LoginScreen from "screens/auth/LoginScreen.jsx";
import RegisterMemberScreen from "screens/auth/RegisterMemberScreen.jsx";
import RegisterScreen from "screens/auth/RegisterScreen.jsx";
import ResetPasswordScreen from "screens/auth/ResetPasswordScreen.jsx";
import VerifyAccountScreen from "screens/auth/VerifyAccountScreen.jsx";

// Account Screens
import AccountScreen from "screens/AccountScreen.jsx";
import ProfileScreen from "screens/profile/ProfileScreen.jsx";

// Dashboard Screens
import AdminDashboard from "screens/dashboards/admin/AdminDashboard.jsx";
import ProductDashboard from "screens/dashboards/products/ProductDashboard.jsx";
import ServiceDashboard from "screens/dashboards/services/ServiceDashboard.jsx";

// Miscallenous Screens
import UnsubscribeScreen from "screens/misc/UnsubscribeScreen.jsx";

function App() {
  // Checking for user token and loading public data from API
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDirectoryCategories());
    dispatch(getServiceCategories());
    dispatch(getProductCategories());
    dispatch(getCategories());
    dispatch(getPets());
    dispatch(getBrands());
    if (localStorage.getItem("authToken")) dispatch(loadUser());
    const listener = window.addEventListener("storage", () => dispatch(loadUser()));
    return () => window.removeEventListener("storage", listener);
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Switch>
        {/* Main Routes */}
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/services" component={ServicesScreen} />
        <Route exact path="/services/:serviceId" component={ServiceScreen} />
        <Route exact path="/about" component={AboutScreen} />
        <Route exact path="/contact" component={ContactScreen} />

        {/* Shop Routes */}
        <Route exact path="/shop" component={ShopScreen} />
        <Route exact path="/shop/:productId" component={ProductScreen} />
        <Route exact path="/shop/category/:category" component={CategoryScreen} />
        <Route exact path="/shop/brand/:brand" component={BrandScreen} />
        <Route exact path="/shop/pet/:pet" component={PetScreen} />
        <Route exact path="/shop/search/:query" component={SearchResultsScreen} />

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

        {/* Miscallenous Routes */}
        <Route exact path="/newsletter/unsubscribe" component={UnsubscribeScreen} />

        {/* Custom directory URL routes, must be at the end */}
        <Route path="/directories" component={DirectoriesScreen} />
        <Route path="/:username" component={DirectoryProfileScreen} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
