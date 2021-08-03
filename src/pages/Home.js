import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="home">
			<div className="home-content container">
				<h1>Welcome to Sandwich!</h1>
				<h2 className="home-rules">
					Sandwich is a 2 player game where each player plays a card per turn into the center pile. If the
					player puts down a card and the value of the card is the same as the previous or 2 cards
					before(Sandwich), then the player wins!
				</h2>
				<Link to="/play">Play!</Link>
			</div>
		</div>
	);
};

export default Home;
