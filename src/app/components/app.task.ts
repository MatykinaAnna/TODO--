import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {Task} from '../classes/task'  
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../service/http.serviceProject'
import {InMemoryDataService} from '../../in-memory-data.service'

@Component({
    selector: 'task',
    templateUrl: '../../layout/app.task.html',
    styleUrls: ['../../style/app.task.css'],
    providers: [HttpService]
})

export class OneTask implements OnInit { 

    public _task: Task|undefined = undefined;
    public _task_name: string
    public subtask: Task[]
    public subtaskOnScreen: boolean
    public subtask_name: string
    public editTask: boolean;
    public formForSubtask: boolean
    public check: boolean;

    // private tasks: Task[] = []
    private dataService: InMemoryDataService
    private httpService: HttpService;

    @Input() set task (task: Task){

        if (task != undefined){
            this._task = task
            this.getAllSubtask()
        } else {
        }
    }
    @Output() delTask = new EventEmitter<boolean>();

    constructor(http: HttpClient){
        this.editTask = false
        this.formForSubtask = false
        this.httpService = new HttpService(http)
        this.check = false
        this.dataService = new InMemoryDataService()
        this.subtask = []
        this.subtaskOnScreen = false
    }

    ngOnInit(): void{
    }

    getAllSubtask(){
        this.httpService.getTasks().subscribe((data: Task[])=>{
            data.forEach((item: Task)=>{
                if (item.parentTaskId == this._task.id){
                    this.subtask.push(item)
                }
            })
        })
    }

    edit(){
        this._task_name=this._task.name
        this.editTask = !this.editTask
    }

    updateTask(){
        if (this._task_name != ''){
            let t = this._task
            t.name = this._task_name
            this.httpService.updateTask(t).subscribe(()=>{
                this.httpService.getTasks().subscribe((data)=>{
                })
                this.edit()
            })
        }
        console.log('updateTask')
    }

    checkTask(){
        this.check=!this.check
    }

    deleteTask(){
        console.log('deleteTask')
        console.log(this._task.id)
        this.httpService.deleteTask(this._task.id).subscribe(()=>{
            this.delTask.emit(true)
        })
    }

    addSubtask(){
        console.log(this._task.id)
        this.formForSubtask = !this.formForSubtask
    }
    editSubtask(){
        this.subtask_name=''
        this.formForSubtask = !this.formForSubtask
    }
    saveSubtask(){
        if (this.subtask_name!=''){ 
            this.httpService.getTasks().subscribe((data: Task[])=>{
                let id = this.dataService.genId(data)
                let subtask = new Task(id, this.subtask_name, new Date(),
                                        this._task.parentProjectId,
                                        this._task.id)
                this.httpService.addTask(subtask).subscribe((data)=>{
                    this.subtask.push(data)
                })
                this.subtask_name = ''
            })
            this.formForSubtask = !this.formForSubtask
        }
    }
    f_subtaskOnScreen(){
        this.subtaskOnScreen = !this.subtaskOnScreen
    }

}