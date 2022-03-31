import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from '../in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';

import { AppProject }   from './app.projects';
import { ModalWindowAddProject } from './components/app.modalWindowAddProject'
import { OneProject } from './components/app.one_project';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule,
        //remove this when real api will be ready              
        HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
    )],
    declarations: [ 
        AppProject,
        ModalWindowAddProject,
        OneProject ],
    bootstrap:    [ AppProject ]
})
export class AppModule { }