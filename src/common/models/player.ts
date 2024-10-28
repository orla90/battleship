export interface PlayerJson {
  name: string;
  password: string;
}

export class Player {
  id: string;
  name: string;
  password: string;
  ws: WebSocket

  constructor({
    id,
    name,
    password,
    ws,
  }: {
    id: string;
    name: string;
    password: string;
    ws: WebSocket
  }) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.ws = ws;
  }
}

export class PlayerRegResponseData {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;

  constructor({
    name,
    index,
    error,
    errorText,
  }: {
    name: string;
    index: number | string;
    error: boolean;
    errorText: string;
  }) {
    this.name = name;
    this.index = index;
    this.error = error;
    this.errorText = errorText;
  }
}

export class CurPlayer {
  curPlayer: string | number;

  constructor({
    curPlayer,
  }: {
    curPlayer: string | number;
  }) {
    this.curPlayer = curPlayer;
  }
}