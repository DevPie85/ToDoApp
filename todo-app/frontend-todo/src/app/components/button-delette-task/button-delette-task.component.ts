import { Component, Input } from '@angular/core';
import { DialogDeletteTaskComponent } from './dialog-delette-task/dialog-delette-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-button-delette-task',
  templateUrl: './button-delette-task.component.html',
  styleUrls: ['./button-delette-task.component.scss'],
})
export class ButtonDeletteTaskComponent {
  @Input() task: [] = []; // riceve l'oggetto task come input dal componente padre

  constructor(public dialog: MatDialog) {} // inietta il servizio MatDialog

  // metodo per aprire il dialogo di eliminazione del task
  openDeletteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogDeletteTaskComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { task: this.task }, // passa l'oggetto task al dialogo
    });
  }
}
