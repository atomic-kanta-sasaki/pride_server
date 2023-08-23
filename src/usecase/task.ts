import { TaskPort } from '../port/taskPort'

export class TaskUseCase {
  private taskPort: TaskPort

  constructor(taskPort: TaskPort) {
    this.taskPort = taskPort
  }

  getById(id: number) {
    return this.taskPort.find(id)
  }

  getList() {
    return this.taskPort.findAll()
  }

  create(content: string) {
    return this.taskPort.create(content)
  }

  async update(id: number, status: number) {
    const task = await this.taskPort.find(id)
    const updateTask = task.updateStatus(status)
    return this.taskPort.update(updateTask)
  }

  async delete(id: number) {
    return this.taskPort.delete(id)
  }
}
