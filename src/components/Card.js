import React, { useEffect, useState } from "react";
import { randomNumber } from "../util/randomNumber";

const Card = ({ imgSrc, code }) => {
	const [transformStyle, setTransformStyle] = useState({});

	// https://github.com/dpw1/react-deck-of-cards/blob/master/src/Card.js
	useEffect(() => {
		const translateX = `${randomNumber(-40, 40, 1)}px`;
		const translateY = `${randomNumber(-40, 40, 1)}px`;
		const rotation = `${randomNumber(-180, 180, 1)}deg`;
		const style = {
			transform: `translate(${translateX}, ${translateY}) rotate(${rotation})`,
		};
		setTransformStyle(style);
	}, []);

	return (
		<figure className="card" style={transformStyle}>
			<img src={imgSrc} alt={code} />
		</figure>
	);
};

export default Card;
