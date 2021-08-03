import React, { useState, useEffect } from "react";

const Player = ({ deckInfo, setDeckInfo, playingField, setPlayingField, playerNo }) => {
	const drawCard = async () => {
		const pileRes = await fetch(
			`https://deckofcardsapi.com/api/deck/${deckInfo.deck_id}/pile/player${playerNo}/list/`
		);
		const pile = await pileRes.json();
		console.log(pile);

		const drawFromPileRes = await fetch(
			`https://deckofcardsapi.com/api/deck/${deckInfo.deck_id}/pile/player${playerNo}/draw/?count=1`
		);
		const drawFromPile = await drawFromPileRes.json();
		setPlayingField([...playingField, drawFromPile.cards[0]]);
	};

	// nw5ebl2bvv5l
	// https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list/
	// https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S
	// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
	// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/

	return (
		<div>
			Player {playerNo}
			<button onClick={drawCard}>play card</button>
		</div>
	);
};

export default Player;
