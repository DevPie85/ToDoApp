import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskService } from 'src/services/task.service';
import { Task } from 'src/services/task.interface';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss'],
})
export class DialogEditTaskComponent implements OnInit {
  task: Task = this.data.task; // riceve l'oggetto task come input dal componente padre

  taskForm: FormGroup = new FormGroup({}); // il form che gestisce i dati del task

  constructor(
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any, // dati iniettati nel dialog
    private _snackBar: MatSnackBar // servizio per la gestione degli snack bar
  ) {}

  ngOnInit() {
    // inizializzazione del form
    this.taskForm = new FormGroup({
      title: new FormControl(this.task.title, Validators.required),
      description: new FormControl(this.task.description, Validators.required),
      createdAt: new FormControl(this.task.createdAt, Validators.required),
      priority: new FormControl(this.task.priority, Validators.required),
      status: new FormControl(this.task.status, Validators.required),
    });
  }

  // SnackBar
  durationInSeconds = 2;
  snackBarMessage: string = '';
  openSnackBar() {
    this._snackBar.open(this.snackBarMessage, 'close', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top', // 'top' | 'bottom'
    });
  }

  // Metodo per aggiornare il task
  updateTask() {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.task,
        ...this.taskForm.value,
      };

      this.taskService.updateTask(updatedTask).subscribe({
        next: (response) => {
          this.snackBarMessage = 'Task aggiornato con successo';
          this.openSnackBar();

          this.taskService.emitterRefreshTable.next();
        },
        error: (error) => {
          this.openSnackBar();
          this.snackBarMessage = "Errore nell'aggiornamento del task";
        },
      });
    }
  }
}
