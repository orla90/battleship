export type ShipType = "small" | "medium" | "large" | "huge";

export interface ShipCoordinates {
  x: number,
  y: number,
}

export class Game {
  idGame: number | string;
  idPlayer: number | string;

  constructor({
    idGame,
    idPlayer,
  }: {
    idGame: number | string;
    idPlayer: number | string;
  }) {
    this.idGame = idGame;
    this.idPlayer = idPlayer;
  }
}

export class GameWithShips {
  gameId: number | string;
  ships: Ship[];
  indexPlayer: number | string;

  constructor({
    gameId,
    ships,
    indexPlayer,
  }: {
    gameId: number | string;
    ships: Ship[];
    indexPlayer: number | string;
  }) {
    this.gameId = gameId;
    this.ships = ships;
    this.indexPlayer = indexPlayer;
  }
}

export class Ship {
  position: ShipCoordinates;
  direction: boolean;
  length: number;
  type: ShipType;

  constructor({
    position,
    direction,
    length,
    type,
  }: {
    position: ShipCoordinates;
    direction: boolean;
    length: number;
    type: ShipType;
  }) {
    this.position = position;
    this.direction = direction;
    this.length = length;
    this.type = type;
  }
}
