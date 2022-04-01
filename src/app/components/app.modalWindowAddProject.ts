import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'modalWindow-addProject',
    templateUrl: '../../layout/app.modalWindowAddProject.html',
    styleUrls: ['../../style/app.modalWindowAddProject.css']
})
export class ModalWindowAddProject implements OnInit { 

    @Output() closeModalWindow = new EventEmitter<boolean>();
    @Output() addProject = new EventEmitter<string>();

    public nameProject: string = ''

    ngOnInit(): void{   
    }

    cancell(submit: boolean){
        this.nameProject = ''
        this.closeModalWindow.emit(submit)
    }
    add(){
        if (this.nameProject != ''){
            this.addProject.emit(this.nameProject)
            this.nameProject = ''
        }
    }
}