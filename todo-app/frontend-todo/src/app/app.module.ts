import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Custom Components modules */
import { TaskTableComponent } from './components/task-table/task-table.component';
import { DialogAddTaskComponent } from './components/button-add-task/dialog-add-task/dialog-add-task.component';
import { ButtonAddTaskComponent } from './components/button-add-task/button-add-task.component';
import { ButtonEditTaskComponent } from './components/button-edit-task/button-edit-task.component';
import { DialogEditTaskComponent } from './components/button-edit-task/dialog-edit-task/dialog-edit-task.component';
import { CheckboxFilterTaskTableComponent } from './components/checkbox-filter-task-table/checkbox-filter-task-table.component';
import { TaskSearchInputComponent } from './components/task-search-input/task-search-input.component';
import { CurrentDateComponent } from './components/current-date/current-date.component';

/* Pages */
import { MainPageTaskComponent } from './pages/page-task/main-page-task';

/* Angular material module */
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ButtonDeletteTaskComponent } from './components/button-delette-task/button-delette-task.component';
import { DialogDeletteTaskComponent } from './components/button-delette-task/dialog-delette-task/dialog-delette-task.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/* registro la data e l'ora per l'italia */
import { registerLocaleData } from '@angular/common';
import it from '@angular/common/locales/it';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(it);

@NgModule({
  declarations: [
    AppComponent,
    TaskTableComponent,
    MainPageTaskComponent,
    DialogAddTaskComponent,
    ButtonAddTaskComponent,
    ButtonDeletteTaskComponent,
    DialogDeletteTaskComponent,
    ButtonEditTaskComponent,
    DialogEditTaskComponent,
    CheckboxFilterTaskTableComponent,
    TaskSearchInputComponent,
    CurrentDateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'it-IT' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
