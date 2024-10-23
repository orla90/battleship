import { MessageTypesEnum } from "../common/enums/message-types.enum";
import { handlePlayerRequests } from "../controllers/player.controller";
import WebSocket from "ws";

export const wsServerHandler = (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    console.log("received message: %s", message);

    const { type, data } = JSON.parse(message);
    const dataObj = JSON.parse(data);
    console.log("received: %s", data);

    let response;

    if (type) {
      switch (type) {
        case MessageTypesEnum.REG:
          response = handlePlayerRequests(dataObj);
          break;
      }

      ws.send(JSON.stringify(response));
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error(`WebSocket error: ${error}`);
  });
};
