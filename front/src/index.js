import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
// import { Provider } from "react-redux"; // Import Provider
// import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //     {" "}
  //     {/* Wrap App with Provider and pass the store */}
  //     <App />
  //   </Provider>
  // </React.StrictMode>

  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
