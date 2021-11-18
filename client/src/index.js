// Dependencies
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// Main app component
import App from "./App";

// CSS files
import "./custom.scss";
import "./index.css";
import "swiper/swiper.scss";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
