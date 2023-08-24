import { PrideContent } from '../domain/pride'

export interface PridePort {
  findAll(): Promise<PrideContent[]>
  find(id: number): Promise<any>
  create(content: String): Promise<any>
  update(content: PrideContent): Promise<any>
  delete(id: number): Promise<any>
}
