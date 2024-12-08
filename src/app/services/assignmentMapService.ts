import { Injectable } from '@angular/core';
import { Assignment } from '../../shared/models/assignment';
import { Course } from '../../shared/models/course';
import { UserData } from '../../shared/models/userData';
import { Group } from '../../shared/models/group';
import { Word } from '../../shared/models/word';

@Injectable({
  providedIn: 'root',
})
export class AssignmentMapService {
  mapAssignment(apiData: any): Assignment {
    return new Assignment(
      apiData.id,
      apiData.title,
      apiData.maxGrade,
      new Date(apiData.dueDate),
      new Course(
        apiData.course.id,
        apiData.course.courseName,
        apiData.course.description
      ),
      new UserData(
        apiData.createdBy.id,
        apiData.createdBy.username,
        apiData.createdBy.role,
        apiData.createdBy.isActive
      ),
      new Group(
        apiData.group.id,
        apiData.group.groupName,
        apiData.group.streamId
      ),
      apiData.requiredWords.map((word: Word) => new Word(word.value)),
      apiData.prohibitedWords.map((word: Word) => new Word(word.value))
    );
  }
}
