import {Project} from '../classes/project'
import {Task} from '../classes/task'

export class Data {
    
    public project: Project[] = []
    public task: Task[] = []

    constructor(){}

    public addProject(name: string){
        let project: Project
        let d = new Date()
        let id: number
        if (this.project.length>0){
            id = this.project[this.project.length - 1].id+1
        } else {
            id = 1
        }
        project = new Project(id, name, d)
        this.project.push(project)
    }

    public addTask(name: string, parentProjectId: number, parentTaskId?: number){
        let task: Task
        let d = new Date()
        let id: number
        if (this.task.length > 0){
            id = this.task[this.task.length - 1].id+1
        }
        if (parentTaskId){
            task = new Task(id, name, d, parentProjectId, parentTaskId)
        } else {
            task = new Task(id, name, d, parentProjectId)
        }
        this.task.push(task)
    }

    public getAllProject(){
        return this.project
    }

    public getAllTask(){
        return this.task
    }

}