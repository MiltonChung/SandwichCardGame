import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
	return (
		<div className="App">
			<Navbar />
			<ScrollToTop />
			<Switch>
				<Route path="/play">
					<Game />
				</Route>
				<Route path="/" exact>
					<Home />
				</Route>
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
