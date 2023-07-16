import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  // Inizializza l'array tasks e il contatore degli ID
  private tasks = [];
  private idCounter = 1;

  // Restituisce tutti i task
  getAllTasks() {
    return this.tasks;
  }

  // Restituisce i task con l'ID specificato, lancia un'eccezione se non trova l'id
  getTaskById(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  // Crea un nuovo task e lo aggiunge all'array tasks
  createTask(createTaskDto: CreateTaskDto) {
    const newTask = { id: this.idCounter++, ...createTaskDto };
    this.tasks.push(newTask);
    return newTask;
  }

  // Aggiorna i task con l'ID specificato, lancia un'eccezione se non trova l'id
  updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const numericId = Number(id);
    const taskIndex = this.tasks.findIndex((task) => task.id === numericId);
    if (taskIndex === -1) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    const updatedTask = { ...this.tasks[taskIndex], ...updateTaskDto };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  // Cancella il task con l'ID specificato,lancia un'eccezione se non trova l'id
  deleteTask(id: string | number) {
    const numericId = Number(id);
    const taskIndex = this.tasks.findIndex((task) => task.id === numericId);
    if (taskIndex === -1) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    this.tasks.splice(taskIndex, 1);
    return { status: 'success', message: 'Task deleted successfully' };
  }
}
