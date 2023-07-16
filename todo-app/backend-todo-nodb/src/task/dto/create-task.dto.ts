export class CreateTaskDto {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'doing' | 'done';
}
