import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav>
			<Link to="/" className="logo">
				Sandwich
			</Link>
			<ul>
				<li>
					<Link to="/play">Play!</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
