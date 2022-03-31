import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {Project} from '../classes/project'  
import {Data} from '../data/data'
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../service/http.serviceProject'

@Component({
    selector: 'one-project',
    templateUrl: '../../layout/app.one_project.html',
    styleUrls: ['../../style/app.one_project.css'],
    providers: [HttpService]

})
export class OneProject implements OnInit { 

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

    constructor(http: HttpClient){
        this.httpService = new HttpService(http)
        this.formEditProject = false
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

    update(){
        console.log('update')
        this.httpService.updateProject(this.project)
            .subscribe(() => {
                
        })

    }
}