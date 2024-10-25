import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { Player } from "../common/models/player";
import { createAndUpdateRoom } from "../db/db";

export const handleRoomRequests = () => {
  try {
    const updateRoomResponse = {
      type: MessageTypesEnum.UPDATE_ROOM,
      data: JSON.stringify([createAndUpdateRoom()]),
      id: 0,
    };

    return updateRoomResponse;
  } catch (error) {
    console.log(error);
  }
};
