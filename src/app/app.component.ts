import { Component, OnInit,  } from '@angular/core';
// import { HttpService} from './http.service';  
import {Project} from './classes/project'  
import { ProjectService } from './service/project.service';

@Component({
    selector: 'my-app',
    template: '',
    providers: [ProjectService]
})
export class AppComponent implements OnInit { 
    
    editedProject: Project|null = null; 
    projects: Array<Project>;
    
    ngOnInit(): void{
        //this.project: Project = new Project()
    }

    // добавление пользователя
    // addProject() {
    //     this.editedProject = new Project('', '', );
    //     this.users.push(this.editedUser);
    //     this.isNewRecord = true;
    // }
}
