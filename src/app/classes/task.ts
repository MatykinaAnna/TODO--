import { AbstractTast } from './abstractTask'
import { Project } from './project'

export class Task extends AbstractTast{

    constructor(public id: number,
                public name: string,
                public dateOfCreation: Date,
                public parentProjectId: number,
                public parentTaskId?: number,
                public dateOfCreationString?: String
                //public subtasks?: Task[] 
                ){
        super();
    }
    
}