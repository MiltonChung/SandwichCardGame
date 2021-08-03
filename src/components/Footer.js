import React from "react";
import Github from "../assets/github.svg";
import LinkedIn from "../assets/linkedin.svg";
import Globe from "../assets/globe.svg";

const Footer = () => {
	return (
		<footer>
			<h2>
				Created by{" "}
				<a href="https://miltonchung.com/" target="_blank" rel="noreferrer">
					Milton Chung
				</a>
			</h2>
			<div className="social-media">
				<a
					className="linkedIn"
					target="_blank"
					href="https://www.linkedin.com/in/miltonchung/"
					rel="noreferrer">
					<img src={LinkedIn} alt="Linkedin" />
				</a>
				<a className="github" target="_blank" href="https://github.com/miltonchung" rel="noreferrer">
					<img src={Github} alt="Github" />
				</a>
				<a className="globe" target="_blank" href="https://miltonchung.com/" rel="noreferrer">
					<img src={Globe} alt="globe" />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
