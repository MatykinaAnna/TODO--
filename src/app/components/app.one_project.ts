import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {Project} from '../classes/project' 
import {Task} from '../classes/task'  
import {Data} from '../data/data'
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../service/http.serviceProject'
import {InMemoryDataService} from '../../in-memory-data.service'

@Component({
    selector: 'one-project',
    templateUrl: '../../layout/app.one_project.html',
    styleUrls: ['../../style/app.one_project.css'],
    providers: [HttpService]

})
export class OneProject implements OnInit { 

    @Output() updateProject = new EventEmitter<boolean>();
    @Output() deleteProject = new EventEmitter<boolean>();

    @Input() set idProject (id: number){
        if (id != undefined){
            this._idProject = id
            this.getDate()
            this.getAllTasks(this._idProject)
        } else {
            this._idProject = id
            this.project = undefined
        }
    }

    public data: Data
    public project: Project|undefined
    public _idProject: number|undefined
    public formEditProject: boolean
    public firstLevel_Tasks: Task[] = []
    public formAddTask: boolean
    public nameNewTask: string = ''

    private dataService: InMemoryDataService
    private httpService: HttpService;
    private tasks: Task[] = []

    constructor(http: HttpClient){
        this.httpService = new HttpService(http)
        this.formEditProject = false
        this.formAddTask = false
        this.dataService = new InMemoryDataService()
    }

    ngOnInit(): void{
    }

    getDate(){
        this.httpService.getProject(this._idProject).subscribe((data:Project) => {
            let d = new Date(data.dateOfCreation)
            this.project = new Project(data.id,
                                        data.name,
                                        d, d.toLocaleDateString())    
        })
    }

    ngOnChanges() {
    }

    getAllTasks(idRrj: number): void{
        console.log('getAllTasks')
        this.firstLevel_Tasks = []
        this.httpService.getTasks().subscribe((data:Task[]) => {
            this.tasks = data
            data.forEach(element => {
                if (element.parentTaskId == -1 && element.parentProjectId == idRrj){
                    this.firstLevel_Tasks.push(element)
                }
            });
        });
    }

    edit(){
        this.formEditProject = !this.formEditProject
    }

    update(): void{
        this.httpService.updateProject(this.project).subscribe(()=>{
            this.httpService.getProjects().subscribe((data: any)=>{
                this.formEditProject = !this.formEditProject
                this.updateProject.emit(true)
            })
        })
    }

    deletePrj(): void{
        this.httpService.deleteProject(this._idProject).subscribe(()=>{
            this.httpService.getProjects().subscribe((data: any)=>{
                this.deleteProject.emit(true)
            })
        })
    }

    addTask(){
        this.formAddTask = !this.formAddTask
    }
    saveTask(){
        console.log('saveTask')
        if (this.nameNewTask!=''){
            let id = this.dataService.genId(this.tasks)
            let newT = new Task(id, this.nameNewTask, new Date(), this._idProject, -1)
            this.httpService.addTask(newT)
                .subscribe(task => {
                    console.log('task',task)
                    this.firstLevel_Tasks.push(task)
                    this.tasks.push(task)
                })
            //this.getAllTasks(this._idProject)
            this.nameNewTask=''
            // this.getAllTasks(this._idProject)
            // this.firstLevel_Tasks.push()
            this.formAddTask = !this.formAddTask
        }
    }
}