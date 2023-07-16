import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../services/task.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss'],
})
export class DialogAddTaskComponent implements OnInit {
  // Inizializza un nuovo form vuoto
  taskForm: FormGroup = new FormGroup({});

  constructor(
    private taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {}

  // Metodo per aprire lo snackbar
  durationInSeconds = 2; // Durata dello snackbar
  snackBarMessage: string = '';
  openSnackBar() {
    this._snackBar.open(this.snackBarMessage, 'close', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top',
    });
  }

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      createdAt: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  // Metodo per inviare i dati del form al server
  postTask() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value; // Estrazione dei valori del form come oggetto Task

      this.taskService.addTask(task).subscribe({
        next: (task) => {
          // Aggiorna la tabella dopo l'aggiunta di un nuovo task
          this.taskService.emitterRefreshTable.next();
          this.snackBarMessage = 'Task aggiunto con successo';
          this.openSnackBar();
        },
        error: (error) => {
          this.snackBarMessage = "Errore nell'aggiunta del task";
          this.openSnackBar();
        },
      });
    } else {
      console.log('Il form non è valido');
    }
  }
}
