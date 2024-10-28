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
  currentPlayer: number | string;

  constructor({
    gameId,
    ships,
    indexPlayer,
    currentPlayer,
  }: {
    gameId: number | string;
    ships: Ship[];
    indexPlayer: number | string;
    currentPlayer: number | string;
  }) {
    this.gameId = gameId;
    this.ships = ships;
    this.indexPlayer = indexPlayer;
    this.currentPlayer = currentPlayer;
  }
}

export class Ship {
  position: ShipCoordinates;
  direction: boolean;
  length: number;
  type: ShipType;
  hits?: boolean[];
  coordinates?: ShipCoordinates[];

  constructor({
    position,
    direction,
    length,
    type,
    hits,
    coordinates
  }: {
    position: ShipCoordinates;
    direction: boolean;
    length: number;
    type: ShipType;
    hits: boolean[];
    coordinates?: ShipCoordinates[];
  }) {
    this.position = position;
    this.direction = direction;
    this.length = length;
    this.type = type;
    this.hits = hits;
    this.coordinates = coordinates;
  }
}

export class Attack {
  gameId: number | string;
  x: number;
  y: number;
  indexPlayer: number | string;

  constructor({
    gameId,
    x,
    y,
    indexPlayer,
  }: {
    gameId: number | string;
    x: number;
    y: number;
    indexPlayer: number | string;
  }) {
    this.gameId = gameId;
    this.x = x;
    this.y = y;
    this.indexPlayer = indexPlayer;
  }
}
