const p1 = document.getElementById("player1");
const p2 = document.getElementById("player2");
const turn = document.getElementById("turn");
const infoContainer = document.getElementById("information-container");
export const tableInfo = document.getElementById("table-info");

export function shipMiss(btn){
  if(btn.classList.contains("numbers") || btn.classList.contains("letters") || btn.nodeName == "TABLE" || btn.nodeName == "TD" || btn.nodeName == "TR"){
    return;
  }
  const i = document.createElement("i");
  i.classList.add("fa-solid");
  i.classList.add("fa-xmark");
  btn.append(i);
  tableInfo.textContent = "Miss!";
  btn.style.backgroundColor = "hsl(4, 55%, 45%)";
}

export function shipHit(btn){
  if(btn.classList.contains("numbers") || btn.classList.contains("letters") || btn.nodeName == "TABLE" || btn.nodeName == "TD" || btn.nodeName == "TR"){
    return;
  }
  btn.childNodes[0].classList.remove("hide-ship");
  tableInfo.textContent = "Hit! Have another go!";
  btn.style.backgroundColor = "hsl(150, 43%, 41%)";
}

export function makeShip(btn){
  const i = document.createElement("i");
  i.classList.add("fa-solid");
  i.classList.add("fa-ship");
  i.classList.add("hide-ship");
  btn.append(i);
}

export function changeTurn(player){
  if(player.name === "Player 1"){
    turn.textContent = "Player 2's turn";
    turn.classList.remove("p1-turn");
    turn.classList.add("p2-turn");
  } else {
    turn.textContent = "Player 1's turn";
    turn.classList.remove("p2-turn");
    turn.classList.add("p1-turn");
  }
}

export function updateNumberOfShips(player, players){
  if(player.name === "Player 1"){
    p2.textContent = `Player 2 has ${players[1].shipList.length} ships remaining`;
  } else {
    p1.textContent = `Player 1 has ${players[0].shipList.length} ships remaining`;
  }
}

export let isWinner = false;

export function declareWinner(player){
  isWinner = true;
  if(player.name === "Player 1"){
    infoContainer.innerHTML = `<div class="winner-container-p1">
    <p class="winner-text">Player 1 has won</p></div>
    <div id="reset-button" class="reset-button-container">
    <p>Reset</p>
  </div>`;
  } else {
    infoContainer.innerHTML = `<div class="winner-container-p2">
    <p class="winner-text">Player 2 has won</p></div>
    <div id="reset-button" class="reset-button-container">
    <p>Reset</p>
  </div>`;
  }
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", () => {
    location.reload();
  });
}