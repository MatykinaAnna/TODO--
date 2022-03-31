import { Component, OnInit,  } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from './classes/project'  
import {Data} from './data/data'
import {HttpService} from '../service/http.serviceGet'

@Component({
    selector: 'my-app',
    templateUrl: '../layout/app.project.html',
    styleUrls: ['../style/app.project.css'],
    providers: [HttpService]
})
export class AppProject implements OnInit { 
    
    editedProject: Project|null = null; 
    indexProject: number
    projects: Array<Project> = [];
    data: Data

    private httpService: HttpService;

    constructor(private http: HttpClient){
        this.httpService = new HttpService(http)
        this.data = new Data(this.httpService)
    }

    //public isHidden: boolean = true
    public openAddProject: boolean = false
    
    ngOnInit(): void{
        this.httpService.getData('api /objects').subscribe((data:any) => {
            console.log(data)
            this.projects = data
            this.indexProject = this.projects[0].id
        });
    }

    openModalWindow(){
        this.openAddProject = !this.openAddProject
    }
    closeModalWindow(submit: boolean){
        this.openAddProject = submit
    }
    addProject(nameProject: string){
        let p = this.data.addProject(nameProject)
        this.openAddProject = false
        this.projects.push(p)
        console.log(this.projects)
    }
    highlight(index:number): object{
        return{
            highlight: index == this.indexProject
        }
    }
}
