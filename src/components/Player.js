import React, { useEffect } from "react";

const Player = ({
	deckInfo,
	playingField,
	setPlayingField,
	playerNo,
	turn,
	setWinner,
	piles,
	setPiles,
	winner,
}) => {
	useEffect(() => {
		if (turn === playerNo) {
			const playingFieldLen = playingField.length;
			if (
				playingFieldLen >= 3 &&
				playingField[playingFieldLen - 3].value === playingField[playingFieldLen - 1].value
			) {
				setWinner(`Player${playerNo} is the winner!`);
			}
			if (
				playingFieldLen >= 2 &&
				playingField[playingFieldLen - 2].value === playingField[playingFieldLen - 1].value
			) {
				setWinner(`Player${playerNo} is the winner!`);
			}
		}
	}, [playingField]);

	const drawCard = async () => {
		try {
			const drawFromPileRes = await fetch(
				`https://deckofcardsapi.com/api/deck/${deckInfo.deck_id}/pile/player${playerNo}/draw/?count=1`
			);
			const drawFromPile = await drawFromPileRes.json();
			if (drawFromPile.success) {
				await setPlayingField([...playingField, drawFromPile.cards[0]]);
			} else {
				setWinner("Draw! No more cards.");
			}

			const pileRes = await fetch(
				`https://deckofcardsapi.com/api/deck/${deckInfo.deck_id}/pile/player${playerNo}/list/`
			);
			const pile = await pileRes.json();
			setPiles(pile);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="player">
			<p className="player-no">Player {playerNo}</p>
			<p className="player-rem">
				Cards Remaining: {piles ? piles?.piles[`player${playerNo}`].remaining : "26"}
			</p>
			<button onClick={drawCard} disabled={turn !== playerNo || winner}>
				Play Card
			</button>
		</div>
	);
};

export default Player;
