import { ErrorType } from "../common/enums/error-types.enum";
import { Game } from "../common/models/game";
import { Player, PlayerRegResponseData } from "../common/models/player";
import { Room, RoomUser } from "../common/models/room";

let players: Player[] = [];
let rooms: Room[] = [];

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

export const createPlayer = ({ name, password }: Player) => {
  try {
    const id = crypto.randomUUID();
    const newPlayer = new Player({ id, name, password });
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
      const roomPlayer = players.pop() as Player;
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
    const gameId = crypto.randomUUID();
    room.roomUsers.forEach((user) => {
      const game = new Game({ idGame: gameId, idPlayer: user.index});
      gameParticipants.push(game);
    })
  }
  return gameParticipants;
}