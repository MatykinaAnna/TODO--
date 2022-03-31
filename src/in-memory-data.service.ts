import { InMemoryDbService } from 'angular-in-memory-web-api';
 
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const objects = [
        {id: 1, name: 'Первый проект', dateOfCreation: new Date()},
        {id: 2, name: 'Второй проект', dateOfCreation: new Date()}
    ];
    return {objects};
  }
}