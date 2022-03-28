import { AbstractTast } from './abstractTask'
import { Project } from './project'

export class Task extends AbstractTast{

    constructor(public id: string,
                public name: string,
                public dateOfCreation: Date,
                public parentProject: Project,
                public parentTask?: Task,
                public subtasks?: Task[] 
                ){
        super();
    }
    
}