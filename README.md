# Sandwich

Simple 2-player card game.

Link: https://sandwichgame.netlify.app/

## Table of contents

-  [About](#about)
-  [Technologies](#technologies)
-  [Challenges](#challenges)
-  [Setup](#setup)

## About

Sandwich is a 2 player game where each player plays a card per turn into the center pile. If the player puts down a card and the value of the card is the same as the previous or 2 cards before(Sandwich), then the player wins! Sandwich example: 3 spades, Q diamond, 3 hearts and the player that played the last card(3 hearts) wins! If either player runs out of cards, it's a draw.

This is my submission for Mintbean.io hackathon(https://mintbean.io/meets/7e2331fb-1e0d-4b31-86b9-a46acad877af).

## Technologies

Project is created with:

-  React
-  React Hooks (useEffect, useState)
-  Sass
-  API/JSON (https://deckofcardsapi.com/)

## Challenges

-  Calling the API in the correct order for every action the user takes
-  Updating the states correctly after every API call

## Setup

To run this project locally, go into the root folder:

```
$ npm install
$ npm start
```
