import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entity/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  // Restituisce tutti i task
  async getAllTasks() {
    return await this.tasksRepository.find();
  }

  // Restituisce il task con l'ID specificato, lancia un'eccezione se non trovato
  async getTaskById(id: number) {
    const task = await this.tasksRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  // Crea una nuova task e la aggiunge all'array tasks
  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(createTaskDto);
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  // Aggiorna la task con l'ID specificato, lancia un'eccezione se non trovato
  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.preload({ id, ...updateTaskDto });
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return await this.tasksRepository.save(task);
  }

  // Cancella la task con l'ID specificato, lancia un'eccezione se non trovato tramite getTaskById()
  async deleteTask(id: number) {
    const task = await this.getTaskById(id);
    return await this.tasksRepository.remove(task);
  }
}
