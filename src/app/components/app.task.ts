import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {Task} from '../classes/task'  
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../service/http.serviceProject'

@Component({
    selector: 'task',
    templateUrl: '../../layout/app.task.html',
    styleUrls: ['../../style/app.task.css'],
    providers: [HttpService]
})

export class OneTask implements OnInit { 

    public _task: Task|undefined = undefined;
    public editTask: boolean;
    public check: boolean;

    private httpService: HttpService;

    @Input() set task (task: Task){
        if (task != undefined){
            this._task = task
        } else {
        }
    }
    @Output() delTask = new EventEmitter<boolean>();

    constructor(http: HttpClient){
        this.editTask = false
        this.httpService = new HttpService(http)
        this.check = false
    }

    ngOnInit(): void{
    }

    edit(){
        this.editTask = !this.editTask
    }

    updateTask(){
        console.log('updateTask')
        this.httpService.updateTask(this._task).subscribe(()=>{
            this.httpService.getTasks().subscribe((data)=>{
                // console.log(data)
            })
            this.edit()
        })
    }

    checkTask(){
        this.check=!this.check
    }

    deleteTask(){
        console.log('deleteTask')
        console.log(this._task.id)
        this.httpService.deleteTask(this._task.id).subscribe(()=>{
            // this.httpService.getTasks().subscribe((data)=>{
            //     console.log(data)
            // })
            this.delTask.emit(true)
        })
    }

}