import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from './app/classes/project' 
import { Task } from './app/classes/task' 

export class InMemoryDataService implements InMemoryDbService {
  constructor(){}
  createDb() {
    const project = [
        {id: 1, name: 'Первый проект', dateOfCreation: new Date(new Date().setDate(new Date().getDate() - 1))},
        {id: 2, name: 'Второй проект', dateOfCreation: new Date()}
    ];
    const task = [
      {
        id: 1,
        name: 'Первая задача',
        dateOfCreation: new Date(),
        parentProjectId: 1,
        parentTaskId: -1
      },
      {
        id: 2,
        name: 'Вторая задача',
        dateOfCreation: new Date(),
        parentProjectId: 1,
        parentTaskId: -1
      },
      {
        id: 3,
        name: 'Первая задача',
        dateOfCreation: new Date(),
        parentProjectId: 2,
        parentTaskId: -1
      },
      {
        id: 4,
        name: 'Первая подзадача',
        dateOfCreation: new Date(),
        parentProjectId: 2,
        parentTaskId: 1
      },
      {
        id: 5,
        name: 'Вторая подзадача',
        dateOfCreation: new Date(),
        parentProjectId: 2,
        parentTaskId: 1
      }
  ];
    return {project, task};
  }

  genId<T extends Project | Task>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 1;
  }
}
