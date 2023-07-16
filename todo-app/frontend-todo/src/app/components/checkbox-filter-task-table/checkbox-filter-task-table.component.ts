import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../../services/task.interface';
import { Subscription } from 'rxjs';
import { TaskTableService } from '../../../services/task-table-service.service';

@Component({
  selector: 'app-checkbox-filter-task-table',
  templateUrl: './checkbox-filter-task-table.component.html',
  styleUrls: ['./checkbox-filter-task-table.component.scss'],
})
export class CheckboxFilterTaskTableComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  private subscription: Subscription;

  originalData: Task[] = []; // Cache dei dati originali
  filters: Record<string, string[]> = { priority: [], status: [] }; // oggetto per tracciare filtri attivi

  priorities: string[] = []; // Array con tutte le possibili priority
  statuses: string[] = []; // Array con tutti i possibili status

  priorityCounts: Record<string, number> = {}; // Oggetto per il numero dei priority
  statusCounts: Record<string, number> = {}; // Oggetto per tracciare il numero di status

  constructor(private todoTableService: TaskTableService) {
    this.subscription = this.todoTableService.currentDataSource.subscribe(
      (ds) => {
        this.dataSource = ds;
        this.originalData = [...ds.data];

        // Estrae i valori univoci per priority e status
        this.priorities = Array.from(
          new Set(this.originalData.map((task) => task.priority))
        );
        this.statuses = Array.from(
          new Set(this.originalData.map((task) => task.status))
        );

        // Calcola il numero di priority e status
        this.priorityCounts = this.calculatePriorityStatus(
          this.originalData,
          'priority'
        );
        this.statusCounts = this.calculatePriorityStatus(
          this.originalData,
          'status'
        );
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    // Annulla la sottoscrizione al dataSource al termine del componente
    this.subscription.unsubscribe();
  }

  // Gestisce l'attivazione/disattivazione dei filtri
  toggleFilter(filter: string, type: 'priority' | 'status') {
    const index = this.filters[type].indexOf(filter);

    if (index > -1) {
      this.filters[type].splice(index, 1);
    } else {
      this.filters[type].push(filter);
    }

    this.applyFilters();
  }

  // Applica i filtri attivi alla dataSource
  applyFilters() {
    const filteredData = this.originalData.filter((task) => {
      return (
        (this.filters['priority'].length === 0 ||
          this.filters['priority'].includes(task.priority)) &&
        (this.filters['status'].length === 0 ||
          this.filters['status'].includes(task.status))
      );
    });
    this.dataSource.data = filteredData;
  }

  // Calcola il numero di priority e status
  calculatePriorityStatus(
    data: Task[],
    field: 'priority' | 'status'
  ): Record<string, number> {
    return data.reduce((counts: Record<string, number>, task: Task) => {
      const key = task[field];
      counts[key] = counts[key] ? counts[key] + 1 : 1;
      return counts;
    }, {});
  }
}
