import { Group } from './group';
import { Instructor } from './instructor';
import { Course } from './course';
import { UserData } from './userData';
import { Word } from './word';

export class Assignment {
  constructor(
    public id: number,
    public title: string,
    public maxGrade: number,
    public dueDate: Date,
    public course: Course,
    public createdBy: UserData,
    public assignedTo: Group,
    public prohibitedWords: Word[],
    public requiredWords: Word[]
  ) {}
}
