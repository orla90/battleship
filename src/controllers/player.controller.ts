import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { Player } from "../common/models/player";
import { CustomResponse, CustomWSResponse } from "../common/models/response";
import { checkPlayerExists, createGame, createPlayer, getPlayerByNameAndPass, getWSByPlayerId } from "../db/db";

export const handleRegPlayerRequest = (data: Player, ws: WebSocket) => {
  try {
    const dbActionResponse = getPlayerByNameAndPass(data) || checkPlayerExists(data) || createPlayer(data, ws);

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
    const gameParticipants = createGame(indexRoom);
    const createGameResponses = gameParticipants.reduce((acc: CustomWSResponse[], response) => {
      acc.push(new CustomWSResponse(        {
        type: MessageTypesEnum.CREATE_GAME,
        data: JSON.stringify(response),
        id: 0,
        ws: getWSByPlayerId(response.idPlayer)
      }))
      return acc;
    }, [])
    return createGameResponses;
  } catch (error) {
    console.log(error);
  }
};
