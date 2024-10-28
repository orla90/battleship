export interface RoomUser {
  name: string,
  index: number | string,
}

export class Room {
  roomId: number | string;
  roomUsers: RoomUser[];

  constructor({
    roomId,
    roomUsers,
  }: {
    roomId: number | string;
    roomUsers: RoomUser[];
  }) {
    this.roomId = roomId;
    this.roomUsers = roomUsers;
  }
}
