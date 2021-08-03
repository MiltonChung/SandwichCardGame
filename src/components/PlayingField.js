import React, { useEffect } from "react";
import Card from "./Card";

const PlayingField = ({ playingField }) => {
	return (
		<div className="playing-field">
			{playingField.length >= 1 &&
				playingField?.map(card => {
					return <Card key={card.code} imgSrc={card.image} code={card.code} />;
				})}
		</div>
	);
};

export default PlayingField;
