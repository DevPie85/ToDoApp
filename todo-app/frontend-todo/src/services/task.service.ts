import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.interface';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl: string = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/task` || 'http://localhost:3000/task';

  // Un oggetto Subject per la comunicazione tra componenti
  emitterRefreshTable = new Subject<void>();

  constructor(private http: HttpClient) {} // Inietta l'HttpClient

  // Metodo per ottenere tutti i task
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Metodo per ottenere un singolo task dato il suo id
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  // Metodo per aggiungere un nuovo task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Metodo per aggiornare un task esistente
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  // Metodo per eliminare un task dato il suo id
  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }
}
