import { Component, OnInit,  } from '@angular/core';
// import { HttpService} from './http.service';  
import {Project} from './classes/project'  

@Component({
    selector: 'my-app',
    templateUrl: '../layout/app.project.html',
    styleUrls: ['../style/app.project.css']
})
export class AppProject implements OnInit { 
    
    editedProject: Project|null = null; 
    projects: Array<Project>;

    //public isHidden: boolean = true
    public openAddProject: boolean = false
    
    ngOnInit(): void{
        //this.project: Project = new Project()
    }

    addProject(){
        this.openAddProject = !this.openAddProject
    }
    // добавление пользователя
    // addProject() {
    //     this.editedProject = new Project('', '', );
    //     this.users.push(this.editedUser);
    //     this.isNewRecord = true;
    // }
}
