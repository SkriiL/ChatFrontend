import {Permissions} from './permissions';

export class User {
  id: number;
  username: string;
  password: string;
  status: string;
  permissions: Permissions;
}
