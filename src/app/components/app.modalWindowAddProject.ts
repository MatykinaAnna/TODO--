import { Component, OnInit,  } from '@angular/core';

@Component({
    selector: 'modalWindow-addProject',
    templateUrl: '../../layout/app.modalWindowAddProject.html',
    styleUrls: ['../../style/app.modalWindowAddProject.css']
})
export class ModalWindowAddProject implements OnInit { 

    // public f_disabled: boolean = true
    public nameProject: string = ''

    ngOnInit(): void{
        
    }

}