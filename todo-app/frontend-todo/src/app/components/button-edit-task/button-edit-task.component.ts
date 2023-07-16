import { Component, Input } from '@angular/core';
import { DialogEditTaskComponent } from './dialog-edit-task/dialog-edit-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-button-edit-task',
  templateUrl: './button-edit-task.component.html',
  styleUrls: ['./button-edit-task.component.scss'],
})
export class ButtonEditTaskComponent {
  @Input() task: [] = []; // riceve l'oggetto task come input dal componente padre

  constructor(public dialog: MatDialog) {}

  // Apertura del dialog per la modifica del task
  openEditDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogEditTaskComponent, {
      width: '50vw',
      minWidth: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { task: this.task }, // passaggio dell'oggetto task al dialog
    });
  }
}
