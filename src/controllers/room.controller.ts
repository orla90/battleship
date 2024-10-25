import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { GameWithShips } from "../common/models/game";
import { CustomResponse } from "../common/models/response";
import { addShips, createAndUpdateRoom } from "../db/db";

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

export const handleAddShipsRequest = (data: GameWithShips) => {
  try {
    const playersData = [addShips(data)];
    if (playersData) {
      const addShipsResponse = new CustomResponse({
        type: MessageTypesEnum.START_GAME,
        data: JSON.stringify([addShips(data)]),
        id: 0,
      });
  
      return addShipsResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

