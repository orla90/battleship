export interface PlayerJson {
  name: string;
  password: string;
}

export class Player {
  id: string;
  name: string;
  password: string;

  constructor({
    id,
    name,
    password,
  }: {
    id: string;
    name: string;
    password: string;
  }) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}

export class PlayerRegResponse {
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
