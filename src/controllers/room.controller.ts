import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { Attack, GameWithShips } from "../common/models/game";
import { CustomResponse, CustomWSResponse } from "../common/models/response";
import { addShips, createAndUpdateRoom, getWSByPlayerId, updateGame, updateRoom, updateWinners } from "../db/db";

export const handleCreateRoomRequest = () => {
  try {
    const updateRoomResponse = new CustomResponse({
      type: MessageTypesEnum.UPDATE_ROOM,
      data: JSON.stringify([createAndUpdateRoom()]),
      id: 0,
    });

    return updateRoomResponse;
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateRoomRequest = () => {
  try {
    const rooms = updateRoom();
    if (rooms) {
      const updateRoomResponse = new CustomResponse({
        type: MessageTypesEnum.UPDATE_ROOM,
        data: JSON.stringify(updateRoom()),
        id: 0,
      });
  
      return updateRoomResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateWinnersRequest = () => {
  try {
    const updateWinnersResponse = new CustomResponse({
      type: MessageTypesEnum.UPDATE_WINNERS,
      data: JSON.stringify(updateWinners()),
      id: 0,
    });

    return updateWinnersResponse;
  } catch (error) {
    console.log(error);
  }
};

export const handleAddShipsRequest = (data: GameWithShips) => {
  try {
    const playersData = addShips(data);
    if (playersData) {
      const addShipsResponse = (playersData[0] as GameWithShips[]).reduce((acc: CustomWSResponse[], response: GameWithShips) => {
        acc.push(new CustomWSResponse(        {
          type: MessageTypesEnum.START_GAME,
          data: JSON.stringify(response),
          id: 0,
          ws: getWSByPlayerId(response.indexPlayer)
        }))
        return acc;
      }, [])

      const createCurPlayerResponse = new CustomResponse({
        type: MessageTypesEnum.TURN,
        data: JSON.stringify(playersData[1]),
        id: 0,
      })  
      return [addShipsResponse, createCurPlayerResponse];
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleAttackRequest = (data: Attack) => {
  try {
    const attackResponse = updateGame(data);
    if (attackResponse) {
      const attackFeedbackResponse = new CustomResponse({
        type: MessageTypesEnum.ATTACK,
        data: JSON.stringify(attackResponse),
        id: 0,
      });
  
      return attackFeedbackResponse;
    }
  } catch (error) {
    console.log(error);
  }
};
