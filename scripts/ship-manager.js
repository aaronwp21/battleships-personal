import { nanoid } from "https://cdn.skypack.dev/nanoid@4.0.0";
import { makeShip, shipHit, shipMiss, changeTurn, updateNumberOfShips, declareWinner } from "./dom-methods.js";

function randomNumberLetter(){
  let x = Math.floor((Math.random() * 10));
  return x;
}

function randomNumber(){
  let x = Math.floor((Math.random() * 10) + 1);
  return x;
}

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

function generateLetterShip(){
  const num = randomNumberLetter();
  const position = [];
  if(num === 9 || num === 8){
    position.push(letters[num]);
    position.push(letters[num - 1]);
    position.push(letters[num - 2]);
  } else {
    position.push(letters[num]);
    position.push(letters[num + 1]);
    position.push(letters[num + 2]);
  }
  return position;
}

function generateNumberShip(){
  const num = randomNumber();
  const position = [];
  if(num === 10 || num === 9){
    position.push(num);
    position.push(num - 1);
    position.push(num - 2);
  } else {
    position.push(num);
    position.push(num + 1);
    position.push(num + 2);
  }
  return position;
}

class VerticalShip {
  constructor(shipNumber){
    this.shipNumber = shipNumber;
  }
  letters = generateLetterShip();
  number = randomNumber();
  locations = [];
  location1 = "";
  location2 = "";
  location3 = "";
  hits = 0;
  
  getLocations(){
    this.location1 = `${this.letters[0]}${this.number}`;
    this.location2 = `${this.letters[1]}${this.number}`;
    this.location3 = `${this.letters[2]}${this.number}`;
    this.locations.push(this.location1, this.location2, this.location3);
    return this.locations;
  }
}

class VerticalShipP2 {
  constructor(shipNumber){
    this.shipNumber = shipNumber;
  }
  letters = generateLetterShip();
  number = randomNumber();
  locations = [];
  location1 = "";
  location2 = "";
  location3 = "";
  hits = 0;
  
  getLocations(){
    this.location1 = `2${this.letters[0]}${this.number}`;
    this.location2 = `2${this.letters[1]}${this.number}`;
    this.location3 = `2${this.letters[2]}${this.number}`;
    this.locations.push(this.location1, this.location2, this.location3);
    return this.locations;
  }
}

class HorizontalShip {
  constructor(shipNumber){
    this.shipNumber = shipNumber;
  }
  letter = letters[randomNumberLetter()];
  numbers = generateNumberShip();
  locations = [];
  location1 = "";
  location2 = "";
  location3 = "";
  hits = 0;

  getLocations(){
    this.location1 = `${this.letter}${this.numbers[0]}`;
    this.location2 = `${this.letter}${this.numbers[1]}`;
    this.location3 = `${this.letter}${this.numbers[2]}`;
    this.locations.push(this.location1, this.location2, this.location3);
    return this.locations;
  }
}

class HorizontalShipP2 {
  constructor(shipNumber){
    this.shipNumber = shipNumber;
  }
  letter = letters[randomNumberLetter()];
  numbers = generateNumberShip();
  locations = [];
  location1 = "";
  location2 = "";
  location3 = "";
  hits = 0;

  getLocations(){
    this.location1 = `2${this.letter}${this.numbers[0]}`;
    this.location2 = `2${this.letter}${this.numbers[1]}`;
    this.location3 = `2${this.letter}${this.numbers[2]}`;
    this.locations.push(this.location1, this.location2, this.location3);
    return this.locations;
  }
}

export class Player {
  constructor(name){
    this._id = nanoid();
    this.name = name;
    this.ship1 = (this.name === "Player 1" ? new VerticalShip(1) : new VerticalShipP2(1));
    this.ship2 = (this.name === "Player 1" ? new HorizontalShip(2) : new HorizontalShipP2(2));
    this.ship3 = (this.name === "Player 1" ? new VerticalShip(3) : new VerticalShipP2(3));
    this.ship4 = (this.name === "Player 1" ? new HorizontalShip(4) : new HorizontalShipP2(4));
    this.shipList = [];
    this.collision = false;
    this.turn = (this.name === "Player 1" ? true : false);
  }
  getShipList(){
    this.shipList.push(this.ship1);
    this.shipList.push(this.ship2);
    this.shipList.push(this.ship3);
    this.shipList.push(this.ship4);
    return this.shipList;
  }
  placeShip1(){
    const btn1 = document.getElementById(`${this.ship1.getLocations()[0]}`);
    const btn2 = document.getElementById(`${this.ship1.getLocations()[1]}`);
    const btn3 = document.getElementById(`${this.ship1.getLocations()[2]}`);   
    makeShip(btn1);
    makeShip(btn2);
    makeShip(btn3);
  }
  placeShip2(){
    this.ship2.getLocations().forEach((location) => {
      if(this.ship1.getLocations().includes(location)){
        this.collision = true;
      }
    });
    while(this.collision === true){
      let anotherCollision = false;
      this.ship2 = (this.name === "Player 1" ? new HorizontalShip : new HorizontalShipP2);
      this.ship2.getLocations().forEach((location) => {
        if(this.ship1.getLocations().includes(location)){
          anotherCollision = true;
        }
      });
      if(anotherCollision === false){
        this.collision = false;
      }
    }
    const btn1 = document.getElementById(`${this.ship2.getLocations()[0]}`);
    const btn2 = document.getElementById(`${this.ship2.getLocations()[1]}`);
    const btn3 = document.getElementById(`${this.ship2.getLocations()[2]}`);  
    makeShip(btn1);
    makeShip(btn2);
    makeShip(btn3);
  }
  placeShip3(){
    this.ship3.getLocations().forEach((location) => {
      if(this.ship1.getLocations().includes(location)){
        this.collision = true;
      } else if(this.ship2.getLocations().includes(location)){
        this.collision = true;
      }
    })
    while(this.collision === true){
      let anotherCollision = false;
      this.ship3 = (this.name === "Player 1" ? new VerticalShip : new VerticalShipP2);
      this.ship3.getLocations().forEach((location) => {
        if(this.ship1.getLocations().includes(location)){
          anotherCollision = true;
        } else if(this.ship2.getLocations().includes(location)){
          this.collision = true;
        }
      });
      if(anotherCollision === false){
        this.collision = false;
      }
    }
    const btn1 = document.getElementById(`${this.ship3.getLocations()[0]}`);
    const btn2 = document.getElementById(`${this.ship3.getLocations()[1]}`);
    const btn3 = document.getElementById(`${this.ship3.getLocations()[2]}`);   
    makeShip(btn1);
    makeShip(btn2);
    makeShip(btn3);
  }
  placeShip4(){
    this.ship4.getLocations().forEach((location) => {
      if(this.ship1.getLocations().includes(location)){
        this.collision = true;
      } else if(this.ship2.getLocations().includes(location)){
        this.collision = true;
      } else if(this.ship3.getLocations().includes(location)){
        this.collision = true;
      } 
    })
    while(this.collision === true){
      let anotherCollision = false;
      this.ship4 = (this.name === "Player 1" ? new HorizontalShip : new HorizontalShipP2);
      this.ship4.getLocations().forEach((location) => {
        if(this.ship1.getLocations().includes(location)){
          anotherCollision = true;
        } else if(this.ship2.getLocations().includes(location)){
          this.collision = true;
        } else if(this.ship3.getLocations().includes(location)){
          this.collision = true;
        } 
      });
      if(anotherCollision === false){
        this.collision = false;
      }
    }
    const btn1 = document.getElementById(`${this.ship4.getLocations()[0]}`);
    const btn2 = document.getElementById(`${this.ship4.getLocations()[1]}`);
    const btn3 = document.getElementById(`${this.ship4.getLocations()[2]}`);
    const btn4 = document.getElementById(`${this.ship4.getLocations()[3]}`);   
    makeShip(btn1);
    makeShip(btn2);
    makeShip(btn3);
    makeShip(btn4);
  }
  placeAllShips(){
    this.placeShip1();
    this.placeShip2();
    this.placeShip3();
    this.placeShip4();
  }
  handleHit(btn){
    const whichPlayer = players.indexOf(this);
    if(whichPlayer === 0){
      players[1].shipList.forEach((ship) => {
        if(ship.location1 === btn.id || ship.location2 === btn.id || ship.location3 === btn.id){
          Object.assign(ship, ship.hits+=1);
          if(ship.hits === 3){
            players[1].shipList.splice(players[1].shipList.indexOf(ship), 1);
            updateNumberOfShips(this, players);
            if(players[1].shipList.length === 0){
              declareWinner(this);
            }
          }
        }
      });
    } else {
      players[0].shipList.forEach((ship) => {
        if(ship.location1 === btn.id || ship.location2 === btn.id || ship.location3 === btn.id){
          Object.assign(ship, ship.hits+=1);
          if(ship.hits === 3){
            players[0].shipList.splice(players[0].shipList.indexOf(ship), 1);
            updateNumberOfShips(this, players);
            if(players[0].shipList.length === 0){
              declareWinner(this);
            }
          }
        }
      });
    }
  }
  hitOrMiss(btn){
    if(btn.childNodes.length > 0){
      this.handleHit(btn);
      shipHit(btn);
    } else {
      shipMiss(btn);
      changeTurn(this);
      this.turn = false;
      const whichPlayer = players.indexOf(this);
      if(whichPlayer === 0){
        Object.assign(player2, player2.turn = true);
      } else {
        Object.assign(player1, player1.turn = true);
      }
    }
  }
}

const player1 = new Player("Player 1");
const player2 = new Player("Player 2");

export const players = [player1, player2];