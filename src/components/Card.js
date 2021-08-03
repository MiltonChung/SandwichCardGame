import React from "react";

const Card = ({ imgSrc, code }) => {
	return (
		<figure className="card">
			<img src={imgSrc} alt={code} />
		</figure>
	);
};

export default Card;
