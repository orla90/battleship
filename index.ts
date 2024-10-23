import { httpServer } from "./src/http_server/index";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { cwd } from "process";
import { json } from "stream/consumers";
import { WebSocketServer } from 'ws';

dotenv.config({ path: resolve(cwd(), ".env") });

export const HTTP_PORT = process.env.HTTP_PORT || 8181;
export const WS_PORT = Number(process.env.WS_PORT) || 3000;

const wss = new WebSocketServer({ port: WS_PORT });

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT, () => {
  console.log(`Server listening on port ${ HTTP_PORT }`);
});

wss.on('connection', (ws) => {

  ws.on('message', (data) => {
    console.log('received: %s', data);
  });

  // ws.send(JSON.stringify('something'));

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
  });
});
