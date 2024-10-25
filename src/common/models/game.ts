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
