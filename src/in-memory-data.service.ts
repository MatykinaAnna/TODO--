import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Project } from './app/classes/project' 

export class InMemoryDataService implements InMemoryDbService {
  constructor(){}
  createDb() {
    const project = [
        {id: 1, name: 'Первый проект', dateOfCreation: new Date(new Date().setDate(new Date().getDate() - 1))},
        {id: 2, name: 'Второй проект', dateOfCreation: new Date()}
    ];
    return {project};
  }

  genIdPrj(objects: Project[]): number {
    return objects.length > 0 ? Math.max(...objects.map(object => object.id)) + 1 : 1;
  }
}
