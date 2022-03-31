import { Component, OnInit, HostListener } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from './classes/project'  
import {Data} from './data/data'
import {HttpService} from '../service/http.serviceProject'
import {InMemoryDataService} from '../in-memory-data.service'


@Component({
    selector: 'my-app',
    templateUrl: '../layout/app.project.html',
    styleUrls: ['../style/app.project.css'],
    providers: [HttpService]
})
export class AppProject implements OnInit { 
    
    public editedProject: Project|null = null; 
    public indexProject: number
    public projects: Array<Project> = [];
    //public data: Data
    public openAddProject: boolean = false
    private dataService: InMemoryDataService

    private httpService: HttpService;

    constructor(private http: HttpClient){
        this.httpService = new HttpService(http)
        this.dataService = new InMemoryDataService()
        // this.data = new Data(this.httpService)
    }
    
    ngOnInit(): void{
        this.getAllProjects()
    }

    getAllProjects(indexProject?: number): void{
        this.httpService.getProjects().subscribe((data:any) => {
            console.log(data)
            this.projects = data
            if (!indexProject){
                this.indexProject = this.projects[0].id
            } else {
                this.indexProject = this.projects[indexProject].id
            }
        });
    }

    openModalWindow(){
        this.openAddProject = !this.openAddProject
    }
    closeModalWindow(submit: boolean){
        this.openAddProject = submit
    }
    chooseProject(id: number){
        this.indexProject = id
    }
    addProject(nameProject: string){
        let id = this.dataService.genIdPrj(this.projects)
        let p = new Project(id, nameProject, new Date())
        this.httpService.addProject(p)
            .subscribe(project => {
                this.projects.push(project)
            })
        this.openAddProject = false
    }
    highlight(index:number): object{
        return{
            highlight: index == this.indexProject
        }
    }
}
