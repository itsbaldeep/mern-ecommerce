// Dependencies
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// Main app component and css file
import App from "./App";
import "./index.scss";

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
