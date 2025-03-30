export interface IMessager {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    online: boolean;
  }
export interface IChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface IChatRoom {
    id: string;
    creatorId: string;
    receiverId: string;
    type: string;
    status: string;
    messager: IMessager;
    messages: IChatMessage;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

