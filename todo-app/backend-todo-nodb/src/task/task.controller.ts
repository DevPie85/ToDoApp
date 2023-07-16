import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  // Iniezione del servizio nel controller
  constructor(private readonly taskService: TaskService) {}

  // Gestione della richiesta GET a /task
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  // Gestione della richiesta GET a /task/:id
  @Get(':id')
  getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  // Gestione della richiesta POST a /task
  // Il corpo della richiesta deve essere un oggetto che rispetta la struttura del DTO CreateTaskDto
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  // Gestione della richiesta PUT a /task/:id
  // Il corpo della richiesta deve essere un oggetto che rispetta la struttura del DTO UpdateTaskDto
  @Put(':id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  // Gestione della richiesta DELETE a /task/:id
  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
