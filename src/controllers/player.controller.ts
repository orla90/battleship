import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { Player } from "../common/models/player";
import { createPlayer, getPlayerByNameAndPass } from "../db/db";

export const handlePlayerRequests = (data: Player) => {
  try {
    const dbActionResponse = getPlayerByNameAndPass(data) ?? createPlayer(data);

    const regResponse = {
      type: MessageTypesEnum.REG,
      data: JSON.stringify(dbActionResponse),
      id: 0,
    };
    return regResponse;
  } catch (error) {
    console.log(error);
  }
};
