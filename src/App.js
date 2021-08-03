import React, { useState, useEffect } from "react";
import Player from "./components/Player";
import PlayingField from "./components/PlayingField";

const App = () => {
	const [deckInfo, setDeckInfo] = useState([]);
	const [playingField, setPlayingField] = useState([]);
	const [turn, setTurn] = useState(1);

	useEffect(() => {
		const getDeckInfo = async () => {
			const deckRes = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
			const deckData = await deckRes.json();
			await setDeckInfo(deckData);
			for (let i = 1; i <= 2; i++) {
				await addPlayer(deckData, i);
			}
		};

		const addPlayer = async (deckData, index) => {
			const drawnCardsRes = await fetch(
				`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=${deckData.remaining / 2}`
			);
			const drawnCards = await drawnCardsRes.json();
			let pileOneCards = drawnCards.cards.map(card => {
				return card.code;
			});

			const addToPlayerPileRes = await fetch(
				`https://deckofcardsapi.com/api/deck//${
					deckData.deck_id
				}/pile/player${index}/add/?cards=${pileOneCards.join(",")}`
			);
			const addToPlayerPile = await addToPlayerPileRes.json();
			console.log(addToPlayerPile);
		};

		// nw5ebl2bvv5l
		// https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/list/
		// https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S
		// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
		// https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
		getDeckInfo();
	}, []);

	return (
		<div className="App">
			<Player
				playingField={playingField}
				setPlayingField={setPlayingField}
				deckInfo={deckInfo}
				setDeckInfo={setDeckInfo}
				playerNo={1}
			/>
			<PlayingField playingField={playingField} />
			<Player
				playingField={playingField}
				setPlayingField={setPlayingField}
				deckInfo={deckInfo}
				setDeckInfo={setDeckInfo}
				playerNo={2}
			/>
		</div>
	);
};

export default App;
