import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { Player } from "../common/models/player";
import { CustomResponse } from "../common/models/response";
import { checkPlayerExists, createGame, createPlayer, getPlayerByNameAndPass } from "../db/db";

export const handleRegPlayerRequest = (data: Player) => {
  try {
    const dbActionResponse = getPlayerByNameAndPass(data) || checkPlayerExists(data) || createPlayer(data);

    const regResponse = new CustomResponse({
      type: MessageTypesEnum.REG,
      data: JSON.stringify(dbActionResponse),
      id: 0,
    });
    return regResponse;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddUserRequest = ({ indexRoom }: { indexRoom: number | string}) => {
  try {
    const dbActionResponseArr = createGame(indexRoom);
    const createGameResponses = dbActionResponseArr.reduce((acc: CustomResponse[], response) => {
      acc.push(new CustomResponse(        {
        type: MessageTypesEnum.CREATE_GAME,
        data: JSON.stringify(response),
        id: 0,
      }))
      return acc;
    }, [])
    return createGameResponses;
  } catch (error) {
    console.log(error);
  }
};

