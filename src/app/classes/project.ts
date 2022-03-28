import { AbstractTast } from './abstractTask'
import { Task } from './task'

export class Project extends AbstractTast {
    
    constructor(public id: string,
                public name: string, 
                public dateOfCreation: Date, 
                public tasks?: number[]){
        super();
    }
}