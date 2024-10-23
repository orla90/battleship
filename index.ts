import { httpServer } from "./src/http_server/index";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { cwd } from "process";
import { WebSocketServer } from 'ws';
import { wsServerHandler } from './src/ws_server/ws-handler';

dotenv.config({ path: resolve(cwd(), ".env") });

export const HTTP_PORT = process.env.HTTP_PORT || 8181;
export const WS_PORT = Number(process.env.WS_PORT) || 3000;

const wss = new WebSocketServer({ port: WS_PORT });

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT, () => {
  console.log(`Server listening on port ${ HTTP_PORT }`);
});

wss.on('connection', wsServerHandler);
