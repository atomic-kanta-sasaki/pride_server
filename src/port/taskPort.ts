import { Task, Tasks } from '../domain/task'
import { PrideContent } from '../domain/pride'

export interface TaskPort {
  findAll(): Promise<PrideContent[]>
  find(id: number): Promise<any>
  create(content: String): Promise<any>
  update(task: Task): Promise<any>
  delete(id: number): Promise<any>
}
