import {Message} from './message';
import {Observable} from 'rxjs';

export class ChatMessageXref {
  chatId: number;
  messages$: Observable<Message[][]>;
}
