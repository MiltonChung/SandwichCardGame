import React, { useState, useEffect, useCallback } from "react";
import Player from "../components/Player";
import PlayingField from "../components/PlayingField";

// https://deckofcardsapi.com/
const Game = () => {
	const [deckInfo, setDeckInfo] = useState([]);
	const [playingField, setPlayingField] = useState([]);
	const [turn, setTurn] = useState(2);
	const [winner, setWinner] = useState(false);
	const [piles, setPiles] = useState();

	useEffect(() => {
		setTurn(t => (t % 2) + 1);
	}, [playingField]);

	const resetGame = () => {
		setPlayingField([]);
		setDeckInfo([]);
		setTurn(2);
		setWinner(false);
		setPiles();
		getDeckInfo();
	};

	const getDeckInfo = useCallback(async () => {
		try {
			const deckRes = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
			const deckData = await deckRes.json();
			setDeckInfo(deckData);
			for (let i = 1; i <= 2; i++) {
				await addPlayer(deckData, i);
			}
		} catch (err) {
			console.error(err);
		}
	}, []);

	const addPlayer = async (deckData, index) => {
		try {
			const drawnCardsRes = await fetch(
				`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=${deckData.remaining / 2}`
			);
			const drawnCards = await drawnCardsRes.json();
			let pileOneCards = drawnCards.cards.map(card => {
				return card.code;
			});

			await fetch(
				`https://deckofcardsapi.com/api/deck//${
					deckData.deck_id
				}/pile/player${index}/add/?cards=${pileOneCards.join(",")}`
			);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getDeckInfo();
	}, [getDeckInfo]);

	return (
		<div className="game">
			{winner && <p className="pop-up">{winner}</p>}
			{!winner && <h3 className="game-turn">It's player{turn}'s turn</h3>}
			<div className="game-players">
				<Player
					playingField={playingField}
					setPlayingField={setPlayingField}
					deckInfo={deckInfo}
					setDeckInfo={setDeckInfo}
					playerNo={1}
					turn={turn}
					setTurn={setTurn}
					setWinner={setWinner}
					piles={piles}
					setPiles={setPiles}
					winner={winner}
				/>
				<Player
					playingField={playingField}
					setPlayingField={setPlayingField}
					deckInfo={deckInfo}
					setDeckInfo={setDeckInfo}
					playerNo={2}
					turn={turn}
					setTurn={setTurn}
					setWinner={setWinner}
					piles={piles}
					setPiles={setPiles}
					winner={winner}
				/>
			</div>
			<PlayingField playingField={playingField} />
			<button className="game-reset" onClick={resetGame}>
				New Game
			</button>
		</div>
	);
};

export default Game;
