import { PridePort } from '../port/pridePort'

export class PrideContentUseCase {
  private pridePort: PridePort

  constructor(pridePort: PridePort) {
    this.pridePort = pridePort
  }

  getById(id: number) {
    return this.pridePort.find(id)
  }

  getList() {
    return this.pridePort.findAll()
  }

  create(content: string) {
    return this.pridePort.create(content)
  }

  async update(id: number, status: number) {
    const task = await this.pridePort.find(id)
    const updateTask = task.updateStatus(status)
    return this.pridePort.update(updateTask)
  }

  async delete(id: number) {
    return this.pridePort.delete(id)
  }
}
