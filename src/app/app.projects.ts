import { Component, OnInit, HostListener } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from './classes/project'  
import {Data} from './data/data'
import {HttpService} from '../service/http.serviceProject'
import {HttpServicePost} from '../service/http.servicePost'

@Component({
    selector: 'my-app',
    templateUrl: '../layout/app.project.html',
    styleUrls: ['../style/app.project.css'],
    providers: [HttpService, HttpServicePost]
})
export class AppProject implements OnInit { 
    
    public editedProject: Project|null = null; 
    public indexProject: number
    public projects: Array<Project> = [];
    public data: Data
    public openAddProject: boolean = false

    private httpService: HttpService;
    private HttpServicePost: HttpServicePost;

    constructor(private http: HttpClient){
        this.httpService = new HttpService(http)
        this.HttpServicePost = new HttpServicePost(http)
        this.data = new Data(this.httpService)
    }
    
    ngOnInit(): void{
        this.getAllProjects()
    }

    getAllProjects(): void{
        this.httpService.getProject().subscribe((data:any) => {
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
    chooseProject(id: number){
        this.indexProject = id
    }
    addProject(nameProject: string){
        let p = this.data.addProject(nameProject)
        this.openAddProject = false
        console.log('addProject')
        this.HttpServicePost.getProject('api /objects', p)
        this.getAllProjects()

        // this.projects.push(p)
        // console.log(this.projects)
    }
    highlight(index:number): object{
        return{
            highlight: index == this.indexProject
        }
    }
}
