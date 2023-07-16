import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/services/task.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TaskTableService } from '../../../services/task-table-service.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = [
    'title',
    'description',
    'createdAt',
    'priority',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  // Controllo per gestire descrizioni troppo lunghe
  isExpanded: boolean = false;
  isTextTooLong(text: string) {
    const maxLength = 50;
    return text && text.length > maxLength;
  }

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(
    private taskService: TaskService,
    private tableService: TaskTableService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    // Aggiornamento della tabella al cambiamento dei dati
    this.taskService.emitterRefreshTable.subscribe(() => this.getTasks());

    // Aggiornamento del filtro al cambiamento dei dati
    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      const task = JSON.parse(filter);
      return (
        (!task.priority || data.priority === task.priority) &&
        (!task.status || data.status === task.status)
      );
    };
  }

  // Recupero e configurazione dei dati della tabella
  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        // Aggiornamento del dataSource nel servizio
        this.tableService.changeDataSource(this.dataSource);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
