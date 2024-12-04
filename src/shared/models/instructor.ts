import { Course } from './course';
import { UserData } from './userData';

export class Instructor {
  constructor(public user: UserData, public courses: Course[]) {}
}
