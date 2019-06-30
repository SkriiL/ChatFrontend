import {User} from './user';
import {OwnDate} from './own-date';
import {Chat} from './chat';

export class Message {
  id: number;
  user: User;
  date: OwnDate;
  chat: Chat;
  content: string;
}
