import {Project} from '../classes/project'
import {Task} from '../classes/task'
import {HttpService} from '../../service/http.serviceProject'

export class Data {
    
    public project: Project[] =  [
        {id: 1, name: 'Первый проект', dateOfCreation: new Date()},
        {id: 2, name: 'Второй проект', dateOfCreation: new Date()}
    ];
    public task: Task[] = []
    private http: HttpService

    constructor(http: HttpService){
        this.http = http
        this.project = []
    }

    public addProject(name: string): Project{
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
        return (project)
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


    public getOneProject(id: number): Project{
        return this.project.find((item)=>{
            return (item.id == id)
        })

    }

    public getAllTask(){
        return this.task
    }

}