import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-button-add-task',
  templateUrl: './button-add-task.component.html',
  styleUrls: ['./button-add-task.component.scss'],
})
export class ButtonAddTaskComponent {
  constructor(public dialog: MatDialog) {}

  // Metodo per aprire il dialog "DialogAddTaskComponent".
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAddTaskComponent, {
      width: '50vw',
      minWidth: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
