import { Student } from './student';

export class Group {
  constructor(
    public id: number,
    public name: string,
    public srudents: Student[]
  ) {}
}
