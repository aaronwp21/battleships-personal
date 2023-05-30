import { tableInfo, isWinner } from "./dom-methods.js";
import { players } from "./ship-manager.js";

const player1Table = document.getElementById('player1-table');
const player2Table = document.getElementById('player2-table');

players[0].placeAllShips();
players[0].getShipList();
players[1].placeAllShips();
players[1].getShipList();

player1Table.addEventListener("click", (e) => {
  if(e.target.classList.contains("numbers") || e.target.classList.contains("letters") || e.target.nodeName == "TABLE" || e.target.nodeName == "TD" || e.target.nodeName == "TR" || isWinner){
    return;
  } else if (players[0].turn === false){
    const clickedBtn = e.target;
    players[1].hitOrMiss(clickedBtn);
  } else {
    tableInfo.textContent = "It's not your turn!";
  }
});

player2Table.addEventListener("click", (e) => {
  if(e.target.classList.contains("numbers") || e.target.classList.contains("letters") || e.target.nodeName == "TABLE" || e.target.nodeName == "TD" || e.target.nodeName == "TR" || isWinner){
    return;
  } else if (players[1].turn === false){
    const clickedBtn = e.target;
    players[0].hitOrMiss(clickedBtn);
  } else {
    tableInfo.textContent = "It's not your turn!";
  }
});