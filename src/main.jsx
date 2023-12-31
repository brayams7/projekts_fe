import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import "./index.css";
import "./utils.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import Toaster from "./Toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	/*   <React.StrictMode> */
	<Provider store={store}>
		<Toaster>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Toaster>
	</Provider>
	/*   </React.StrictMode>, */
);

