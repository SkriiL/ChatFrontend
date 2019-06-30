import {Permissions} from './permissions';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  verified: boolean;
  status: string;
  permissions: Permissions;
}
