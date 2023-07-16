import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/services/task.interface';
import { TaskTableService } from '../../../services/task-table-service.service';

@Component({
  selector: 'app-task-search-input',
  templateUrl: './task-search-input.component.html',
  styleUrls: ['./task-search-input.component.scss'],
})
export class TaskSearchInputComponent {
  value: string = '';
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  constructor(private tableService: TaskTableService) {
    // Sottoscrizione al dataSource corrente dal servizio
    this.tableService.currentDataSource.subscribe((dataSource) => {
      this.dataSource = dataSource;
      // Personalizzazione del filterPredicate per cercare solo in 'title' e 'description'
      this.dataSource.filterPredicate = (data: Task, filter: string) => {
        const dataStr =
          data.title.toLowerCase() + data.description.toLowerCase();
        return dataStr.indexOf(filter) != -1;
      };
    });
  }

  // Metodo di ricerca eseguito quando l'utente digita nel campo di input
  searchDataTodo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Se esiste un paginatore, ritorna alla prima pagina quando il filtro cambia
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
