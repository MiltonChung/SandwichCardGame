import React from "react";

const PlayingField = playingField => {
	return (
		<div>
			<h2>playing field</h2>
			{console.log(playingField.playingField)}
			{playingField.playingField.length >= 1 &&
				playingField.playingField?.map(card => {
					return <img src={card.images.svg} alt="" />;
				})}
		</div>
	);
};

export default PlayingField;
