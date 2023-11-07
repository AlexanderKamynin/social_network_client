import { IUser } from "./user";

export interface IDialog {
    user: IUser;
    friend: IUser;
    messages: IMessage[];
}

export interface IMessage {
    sender: number,
    message: string;
};