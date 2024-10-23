import { ErrorType } from "../common/enums/error-types.enum";
import { Player, PlayerRegResponse } from "../common/models/player";
import { generateUUID } from "../utils/uuid-generator";

const players: Player[] = [];

export const getPlayerByNameAndPass = ({ name, password }: Player) => {
  try {
    const player = players.find(
      (player) => player.name === name && player.password === password,
    );
    if (player)
      return new PlayerRegResponse({
        name,
        index: player.id,
        error: false,
        errorText: "",
      });
  } catch (error) {
    console.log(error);
  }
};

export const createPlayer = ({ name, password }: Player) => {
  try {
    const id = generateUUID();
    const newPlayer = new Player({ id, name, password });
    players.push(newPlayer);
    return new PlayerRegResponse({
      name,
      index: id,
      error: false,
      errorText: "",
    });
  } catch (error) {
    console.log(ErrorType.ADDING_USER_ERROR);
  }
};
