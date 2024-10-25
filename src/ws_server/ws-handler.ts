import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { handleAddUserRequest, handleRegPlayerRequest } from "../controllers/player.controller";
import WebSocket from "ws";
import { handleAddShipsRequest, handleCreateRoomRequest } from "../controllers/room.controller";

export const wsServerHandler = (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    console.log("received message: %s", message);

    const { type, data } = JSON.parse(message);
    console.log("received: %s", data);

    let responseResult;

    if (type) {
      switch (type) {
        case MessageTypesEnum.REG:
          responseResult = handleRegPlayerRequest(JSON.parse(data));
          break;
        case MessageTypesEnum.CREATE_ROOM:
          responseResult = handleCreateRoomRequest();
          break;
        case MessageTypesEnum.ADD_USER_TO_ROOM:
          responseResult = handleAddUserRequest(JSON.parse(data));
          break;
        case MessageTypesEnum.ADD_SHIPS:
          responseResult = handleAddShipsRequest(JSON.parse(data));
          break;

      }

      if (Array.isArray(responseResult)) {
        responseResult.forEach(response => ws.send(JSON.stringify(response)))
      } else {
        ws.send(JSON.stringify(responseResult));
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
  });
};
