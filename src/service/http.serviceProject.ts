import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Project} from '../app/classes/project'
import {Task} from '../app/classes/task'
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
  
@Injectable()
export class HttpService{

    private projectUrl = 'api/project'; 
    private taskUrl = 'api/task'; 

    constructor(private http: HttpClient){ }

    private log(message: string) {
        console.log(`ProjectService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: отправить ошибку в инфраструктуру удаленного журналирования
          console.error(error); // вместо этого войдем в консоль
      
          // TODO: лучшая работа по преобразованию ошибки для потребления пользователем
          this.log(`${operation} failed: ${error.message}`);
      
          // Дать возможность приложению продолжить работу, вернув пустой результат.
          return new Observable();
        };
      }
      
    getProjects(): Observable<any>{
        return this.http.get<Project[]>(this.projectUrl)
        .pipe(
            tap(_ => this.log('fetched projects')),
            catchError(this.handleError<Project[]>('getProject', []))
          );
    }

    getTasks(): Observable<any>{
      return this.http.get<Project[]>(this.taskUrl)
      .pipe(
          tap(_ => this.log('fetched projects')),
          catchError(this.handleError<Project[]>('getTasks', []))
        );
    }

    getProject(id: number): Observable<Project> {
        const url = `${this.projectUrl}/${id}`;
        return this.http.get<Project>(url).pipe(
          tap(_ => this.log(`fetched project id=${id}`)),
          catchError(this.handleError<Project>(`getProject id=${id}`))
        );
    }

    updateProject(project: Project): Observable<any> {
        let p = {id: project.id,
          name: project.name,
          dateOfCreation: project.dateOfCreation}
        return this.http.put(this.projectUrl, p, httpOptions).pipe(
          tap((_) => this.log(`updated project id=${project.id}`)),
          catchError(this.handleError<any>('updateProject'))
        );
    }

    updateTask(task: Task): Observable<any> {
      let t = {id: task.id,
        name: task.name,
        dateOfCreation: task.dateOfCreation,
        parentProjectId: task.parentProjectId,
        parentTaskId: task.parentTaskId}
      return this.http.put(this.taskUrl, t, httpOptions).pipe(
        tap((_) => this.log(`updated task id=${task.id}`)),
        catchError(this.handleError<any>('updateTask'))
      );
  }

    addProject(project: Project): Observable<Project> {
        let p = {name: project.name, dateOfCreation: project.dateOfCreation}
        return this.http.post<Project>(this.projectUrl, p, httpOptions).pipe(
          tap((newProject: Project) => this.log(`added project w/ id=${newProject.id}`)),
          catchError(this.handleError<Project>('addProject'))
        );
    }

    addTask(task: Task): Observable<Task> {
      console.log(task)
      let t = {name: task.name,
        dateOfCreation: task.dateOfCreation,
        parentProjectId: task.parentProjectId,
        parentTaskId: task.parentTaskId}
      return this.http.post<Task>(this.taskUrl, task, httpOptions).pipe(
        tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
        catchError(this.handleError<Task>('addTask'))
      );
  }

    deleteProject(id: number): Observable<Project> {
        const url = `${this.projectUrl}/${id}`;
        return this.http.delete<Project>(url, httpOptions).pipe(
          tap(_ => this.log(`deleted project id=${id}`)),
          catchError(this.handleError<Project>('deleteProject'))
        );
    }

    deleteTask(id: number): Observable<Task> {
      const url = `${this.taskUrl}/${id}`;
      return this.http.delete<Task>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted task id=${id}`)),
        catchError(this.handleError<Task>('deleteTask'))
      );
    }
}