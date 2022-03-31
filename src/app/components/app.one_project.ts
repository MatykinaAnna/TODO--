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
        console.log(' @Input() ))))')
        if (id != undefined){
            this._idProject = id
            console.log(this._idProject)
        }
    }

    public data: Data
    public project: Project
    public _idProject: number

    private httpService: HttpService;

    constructor(http: HttpClient){
        this.httpService = new HttpService(http)
        // this.data = new Data(this.httpService)
    }

    ngOnInit(): void{
    }

    getDate(){
        // this.httpService.getData(`api/objects/${this._idProject}`).subscribe((data:any) => {
        //     console.log(data)
        //     this.project = data
        // });
        // this.project.dateOfCreationString = this.project.dateOfCreation.toLocaleDateString()
    }

    ngOnChanges() {
    }
}