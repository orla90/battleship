import { ErrorType } from "../common/enums/error-types.enum";
import { Attack, Game, GameWithShips, Ship, ShipCoordinates } from "../common/models/game";
import { CurPlayer, Player, PlayerRegResponseData } from "../common/models/player";
import { Room, RoomUser } from "../common/models/room";

let players: Player[] = [];
let rooms: Room[] = [];
let games: Record<string, GameWithShips[]> = {};

export const getPlayerByNameAndPass = ({ name, password }: Player) => {
  const player = players.find(
    (player) => player.name === name && player.password === password,
  );
  if (player)
    return new PlayerRegResponseData({
      name,
      index: player.id,
      error: false,
      errorText: "",
    });
  return null;
};

export const getWSByPlayerId = (id: string | number) => {
  console.log('id in getWSByPlayerId', id)
  console.log('players in getWSByPlayerId', players)
  return players.find((player) => player.id === id)!.ws;
}

export const checkPlayerExists = ({ name }: Player) => {
  const player = players.find(
    (player) => player.name === name,
  );
  if (player)
    return new PlayerRegResponseData({
      name,
      index: player.id,
      error: true,
      errorText: ErrorType.EXISTING_USERNAME_ERROR,
    });
  return null;
};

export const createPlayer = ({ name, password }: Player, ws: WebSocket) => {
  try {
    const id = crypto.randomUUID();
    const newPlayer = new Player({ id, name, password, ws });
    players.push(newPlayer);
    return new PlayerRegResponseData({
      name,
      index: id,
      error: false,
      errorText: "",
    });
  } catch (error) {
    console.log(ErrorType.ADDING_USER_ERROR);
  }
};

export const updateRoom = (roomId: string | number) => {
  try {
    const room = getRoomById(roomId);
    if (room && (!room.roomUsers?.length || room.roomUsers?.length === 1)) {
      const roomPlayer = players.find(player => player.id !== room.roomUsers[0]?.index) || players[0] as Player;

      room.roomUsers.push(
        {
          name: roomPlayer?.name,
          index: roomPlayer?.id,
        }
      )
    }
    return room;
  } catch (error) {
    console.log(ErrorType.ADDING_USER_ERROR);
  }
}

export const createRoom = () => {
  try {
    const roomId = crypto.randomUUID();
    const roomUsers: RoomUser[] = [];
    const newRoom = new Room({ roomId, roomUsers });
    rooms.push(newRoom);
    return String(roomId);
  } catch (error) {
    console.log(ErrorType.ADDING_USER_ERROR);
  }
};

export const createAndUpdateRoom = () => {
  const roomId = rooms.length && rooms[0].roomId ? rooms[0].roomId : createRoom();
  return updateRoom(roomId!);
}

export const getRoomById = (id: string | number) => {
  return rooms.find(room => room.roomId === id);
}

export const createGame = (indexRoom: number | string) => {
  const room = rooms.find(room => room.roomId === indexRoom);
  const gameParticipants: Game[] = [];
  if (room && room.roomUsers?.length === 2) {
    room.roomUsers.forEach((user) => {
      const game = new Game({ idGame: indexRoom, idPlayer: user.index});
      gameParticipants.push(game);
    })
    games[indexRoom] = gameParticipants.map((game, index, arr) => new GameWithShips({ gameId: game.idGame, ships: [], indexPlayer: game.idPlayer, currentPlayer: arr[0].idPlayer }));
  }

  if(games[indexRoom] && games[indexRoom].length === 2) {
    rooms = rooms.filter(room => room.roomId !== indexRoom)
  }
  return gameParticipants;
}

export const addShips = (data: GameWithShips) => {
  const curentPlayer: CurPlayer = { curPlayer: ''};
  if(games[data.gameId]) {
    const curPlayer = games[data.gameId].find(player => player.indexPlayer == data.indexPlayer);

    console.log("curPlayer", curPlayer)

    if (curPlayer) {
      curPlayer.ships = data.ships.map((ship) => {
        ship.hits = Array(ship.length).fill(false);
        ship.coordinates = generateShipCoordinates(ship);
        return ship;
      });
    }
  }

  if (games[data.gameId] && games[data.gameId][0]?.ships.length && games[data.gameId][1].ships.length) {
    console.log('games[data.gameId] last', games[data.gameId])
    curentPlayer.curPlayer = games[data.gameId][0].currentPlayer;

    return [games[data.gameId], curentPlayer];
  }
}

export const updateGame = (data: Attack) => {
  if (games[data.gameId]) {
    const enemy = games[data.gameId].find(player => player.indexPlayer !== data.indexPlayer);
    const coordinates = shipCoordinates(enemy!.ships);
    const hit = coordinates.find((coord: ShipCoordinates) => coord.x === data.x && coord.y === data.y);
    return hit ? console.log('Попадание!') : console.log('Мимо!');
    }
}

export const generateShipCoordinates = (ship: Ship) => {
  const coordinates = [];
  const { x, y } = ship.position;
  
  for (let i = 0; i < ship.length; i++) {
      if (ship.direction) {
          coordinates.push({ x, y: y + i });
      } else { 
          coordinates.push({ x: x + i, y });
      }
  }
  
  return coordinates;
};

export const shipCoordinates = (ships: Ship[]) => ships.flatMap(generateShipCoordinates);

