import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {Project} from '../classes/project'  
import {Data} from '../data/data'
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../service/http.serviceProject'
import { Location } from '@angular/common';

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
        } else {
            this._idProject = id
            this.project = undefined
        }
    }

    public data: Data
    public project: Project|undefined
    public _idProject: number|undefined
    public formEditProject: boolean

    private httpService: HttpService;
    private location: Location

    constructor(http: HttpClient){
        this.httpService = new HttpService(http)
        this.formEditProject = false
        // this.location = new Location()
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

    edit(){
        this.formEditProject = !this.formEditProject
    }

    goBack(): void {
        this.location.back();
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
}