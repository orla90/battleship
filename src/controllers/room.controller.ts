import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { Player } from "../common/models/player";
import { CustomResponse } from "../common/models/response";
import { createAndUpdateRoom } from "../db/db";

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
