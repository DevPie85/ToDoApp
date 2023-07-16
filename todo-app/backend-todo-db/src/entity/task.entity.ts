import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'text',
    default: 'medium',
  })
  priority: 'low' | 'medium' | 'high';

  @Column({
    type: 'text',
    default: 'todo',
  })
  status: 'todo' | 'doing' | 'done';
}
