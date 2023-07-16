import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private breakpointObserver: BreakpointObserver) {}

  // Questo è un hook del ciclo di vita di Angular
  // In questo caso, stiamo usando setTimeout per ritardare l'osservazione dei breakpoint
  // fino a quando la vista non è completamente inizializzata, per evitare errori.
  ngAfterViewInit() {
    setTimeout(() => {
      this.breakpointObserver
        .observe(['(max-width: 1200px)'])
        .subscribe((result) => {
          if (result.matches) {
            this.drawer.close();
          } else {
            this.drawer.open();
          }
        });
    });
  }

  title = 'ToDoApp';
}
