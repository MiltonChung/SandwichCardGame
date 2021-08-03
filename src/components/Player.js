import React, { useEffect } from "react";

const Player = ({ deckInfo, playingField, setPlayingField, playerNo, turn, setWinner, piles, setPiles }) => {
	useEffect(() => {
		if (turn === playerNo) {
			const playingFieldLen = playingField.length;
			if (
				playingFieldLen >= 3 &&
				playingField[playingFieldLen - 3].value === playingField[playingFieldLen - 1].value
			) {
				console.log(`Player ${playerNo} wins!`);
				setWinner(playerNo);
			}
			if (
				playingFieldLen >= 2 &&
				playingField[playingFieldLen - 2].value === playingField[playingFieldLen - 1].value
			) {
				console.log(`Player ${playerNo} wins!`);
				setWinner(playerNo);
			}
		}
	}, [playingField]);

	const drawCard = async () => {
		const drawFromPileRes = await fetch(
			`https://deckofcardsapi.com/api/deck/${deckInfo.deck_id}/pile/player${playerNo}/draw/?count=1`
		);
		const drawFromPile = await drawFromPileRes.json();
		await setPlayingField([...playingField, drawFromPile.cards[0]]);

		const pileRes = await fetch(
			`https://deckofcardsapi.com/api/deck/${deckInfo.deck_id}/pile/player${playerNo}/list/`
		);
		const pile = await pileRes.json();
		setPiles(pile);
	};

	return (
		<div className="player">
			<p>Player {playerNo}</p>
			<p>Cards Remaining: {piles ? piles?.piles[`player${playerNo}`].remaining : "26"}</p>
			<button onClick={drawCard} disabled={turn !== playerNo}>
				play card
			</button>
		</div>
	);
};

export default Player;
