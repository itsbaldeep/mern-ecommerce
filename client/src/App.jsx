// Libraries
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Components
import Navbar from "./components/Navbar.jsx";

// Screens
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ab47bc",
    },
    secondary: {
      main: "#ab47bc",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
