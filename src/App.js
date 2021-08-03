import React, { useState, useEffect, useCallback } from "react";
import Player from "./components/Player";
import PlayingField from "./components/PlayingField";

const App = () => {
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
		const deckRes = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
		const deckData = await deckRes.json();
		await setDeckInfo(deckData);
		for (let i = 1; i <= 2; i++) {
			await addPlayer(deckData, i);
		}
	}, []);

	const addPlayer = async (deckData, index) => {
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
	};

	useEffect(() => {
		// nw5ebl2bvv5l
		// https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list/
		// https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S
		// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
		// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
		getDeckInfo();
	}, [getDeckInfo]);

	return (
		<div className="App">
			<p>turn: player{turn}'s turn</p>
			{winner && <p>Winner is Player{winner}!</p>}
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
			/>
			<PlayingField playingField={playingField} turn={turn} setTurn={setTurn} />
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
			/>
			<button onClick={resetGame}>reset</button>
		</div>
	);
};

export default App;
