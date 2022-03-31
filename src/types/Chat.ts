export interface IChatMessage {
  avatar: string;
  text: string;
  clientID: string;
  roomID: string;
}

export type RoomUser = {
  username: string;
  clientID: string;
};
