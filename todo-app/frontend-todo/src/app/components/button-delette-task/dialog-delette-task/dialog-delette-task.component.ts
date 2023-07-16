import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/services/task.service';
import { Task } from 'src/services/task.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-delette-task',
  templateUrl: './dialog-delette-task.component.html',
  styleUrls: ['./dialog-delette-task.component.scss'],
})
export class DialogDeletteTaskComponent {
  task: Task = this.data.task; // l'oggetto task viene ricevuto dal componente padre

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {}

  // Metodo per aprire lo snackbar
  durationInSeconds = 2;
  snackBarMessage: string = '';
  openSnackBar() {
    this._snackBar.open(this.snackBarMessage, 'close', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }

  // Metodo per eliminare il task
  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe({
      next: (response) => {
        this.snackBarMessage = 'Task cancellato con successo';
        this.openSnackBar();
        this.taskService.emitterRefreshTable.next(); // emette l'evento per aggiornare la tabella
      },
      error: (error) => {
        this.snackBarMessage =
          'Errore, non è stato possibile cancellare il task';
        this.openSnackBar();
      },
    });
  }
}
