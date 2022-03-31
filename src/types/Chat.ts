export interface IChatMessage {
  avatar: string;
  text: string;
  userID: string;
  roomID: string;
}

export type RoomUser = {
  username: string;
  userID: string;
};
