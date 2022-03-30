import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppProject }   from './app.projects';
import { FormsModule }   from '@angular/forms';
import { ModalWindowAddProject } from './components/app.modalWindowAddProject'

@NgModule({
    imports:      [ BrowserModule, FormsModule],
    declarations: [ 
        AppProject,
        ModalWindowAddProject ],
    bootstrap:    [ AppProject ]
})
export class AppModule { }