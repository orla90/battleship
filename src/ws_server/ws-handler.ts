import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { handleAddUserRequest, handleRegPlayerRequest } from "../controllers/player.controller";
import WebSocket from "ws";
import { handleAddShipsRequest, handleAttackRequest, handleCreateRoomRequest } from "../controllers/room.controller";
import { CustomResponse, CustomWSResponse } from "../common/models/response";

export const wsServerHandler = (ws: WebSocket) => {
  const clientWs = ws as unknown as globalThis.WebSocket;

  ws.on("message", (message: string) => {
    console.log("received message: %s", message);

    const { type, data } = JSON.parse(message);

    let responseResult;

    if (type) {
      switch (type) {
        case MessageTypesEnum.REG:
          responseResult = handleRegPlayerRequest(JSON.parse(data), clientWs);
          break;
        case MessageTypesEnum.CREATE_ROOM:
          responseResult = handleCreateRoomRequest();
          break;
        case MessageTypesEnum.ADD_USER_TO_ROOM:
          const responses = handleAddUserRequest(JSON.parse(data));
          if (responses) {
            responses.forEach((response) => response.ws.send(JSON.stringify(new CustomResponse(response))));
          }
          break;
        case MessageTypesEnum.ADD_SHIPS:
          const addShipResponses = handleAddShipsRequest(JSON.parse(data));
          if (addShipResponses) {
            (addShipResponses![0] as CustomWSResponse[]).forEach((response) => response.ws.send(JSON.stringify(new CustomResponse(response))));
            (addShipResponses![0] as CustomWSResponse[]).forEach((response) => response.ws.send(JSON.stringify(addShipResponses[1])));
          }
          break;
        case MessageTypesEnum.ATTACK:
          responseResult = handleAttackRequest(JSON.parse(data));
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
