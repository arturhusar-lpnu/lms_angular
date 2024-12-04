import { UserData } from './userData';

export class Student {
  constructor(public user: UserData, public isActive: boolean = true) {}
}
