import { Group } from './group';
import { Instructor } from './instructor';
import { Course } from './course';

export class Assignment {
  constructor(
    public id: number,
    public name: string,
    public dueData: Date,
    public course: Course,
    public createdBy: Instructor,
    public assignedTo: Group
  ) {}
}
