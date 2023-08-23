import { TaskUseCase } from '../usecase/task'
import { Task } from '../domain/task'

export class TaskResource {
  private taskUseCase: TaskUseCase

  constructor(taskUseCase: TaskUseCase) {
    this.taskUseCase = taskUseCase
  }

  async findTask(req: any, res: any) {
    const id = req.params.id
    const result = await this.taskUseCase.getById(id)

    return this.serialize(result)
  }

  async findAllTasks(req: any, res: any) {
    const result = await this.taskUseCase.getList()
    return result
  }

  async createTask(req: any, res: any) {
    const { content } = req.body
    const result = await this.taskUseCase.create(content)
    return result
  }

  async updateTask(req: any, res: any) {
    const id = req.params.id
    const { status } = req.body
    const result = await this.taskUseCase.update(id, status)
    return result
  }

  async deleteTask(req: any, res: any) {
    const id = req.params.id
    const result = await this.taskUseCase.delete(id)
    return result
  }

  private serializeTask = (task: Task) => {
    return {
      id: task.id.value,
      content: task.content.value,
      status: task.status.value,
      createdAt: task.createdAt.value,
      updatedAt: task.updatedAt.value
    }
  }

  private serialize(data: any) {
    if (!data) {
      throw new Error('data is undefined or null')
    }
    if (Array.isArray(data)) {
      return data.map(task => this.serializeTask(task))
    }
    return this.serializeTask(data)
  }
}