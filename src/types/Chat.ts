export interface IChatMessage {
  avatar: string;
  text: string;
  userID: string;
  roomID: string;
}

export type RoomPayload = {
  username: string;
  userID: string;
};
