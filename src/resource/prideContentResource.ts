import { PrideContentUseCase } from '../usecase/task'
import { Task } from '../domain/task'

export class TaskResource {
  private prideContentUseCase: PrideContentUseCase

  constructor(taskUseCase: PrideContentUseCase) {
    this.prideContentUseCase = taskUseCase
  }

  async findTask(req: any, res: any) {
    const id = req.params.id
    const result = await this.prideContentUseCase.getById(id)

    return this.serialize(result)
  }

  async findAllPrideContents(req: any, res: any) {
    const result = await this.prideContentUseCase.getList()
    return result
  }

  async createPrideContent(req: any, res: any) {
    const { content } = req.body
    const result = await this.prideContentUseCase.create(content)
    return result
  }

  async updatePrideContent(req: any, res: any) {
    const id = req.params.id
    const { status } = req.body
    const result = await this.prideContentUseCase.update(id, status)
    return result
  }

  async deletePrideContent(req: any, res: any) {
    const id = req.params.id
    const result = await this.prideContentUseCase.delete(id)
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
