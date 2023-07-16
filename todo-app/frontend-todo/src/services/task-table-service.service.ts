//Questo servizio serve per passare il dataSource della tabella tra i componenti
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/services/task.interface';

@Injectable({ providedIn: 'root' })
export class TaskTableService {
  private _dataSource = new BehaviorSubject<MatTableDataSource<Task>>(
    new MatTableDataSource<Task>()
  );
  currentDataSource = this._dataSource.asObservable();

  constructor() {}

  // Aggiorna il dataSource corrente
  changeDataSource(dataSource: MatTableDataSource<Task>) {
    this._dataSource.next(dataSource);
  }
}
