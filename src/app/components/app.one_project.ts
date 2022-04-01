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

    @Input() set idProject (id: number){
        if (id != undefined){
            this._idProject = id
            console.log(this._idProject)
            this.getDate()
        }
    }

    public data: Data
    public project: Project
    public _idProject: number
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
        console.log('getDate')
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
}