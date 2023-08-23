import { TaskPort } from '../port/taskPort'
import { TaskDriver } from '../infrastructure/task'
import {
  Task,
  TaskContent,
  TaskCreatedAt,
  TaskId,
  Tasks,
  TaskStatus,
  TaskUpdatedAt
} from '../domain/task'

import {
  PrideContent,
  PrideContents,
  PrideContentTypeDomain,
  PrideContentId,
  PrideContentUserName,
  PrideContentUserPhotoURL,
  PrideContentTitle,
  PrideContentServiceName,
  PrideContentCustomerName,
  PrideContentSentence,
  PrideContentThumbsUsers
} from '../domain/pride'

export class TaskGateway implements TaskPort {
  private taskDriver: TaskDriver

  constructor(taskDriver: TaskDriver) {
    this.taskDriver = taskDriver
  }

  private convertPrideList(result: any) {
    console.log(result)
    const task = new PrideContent(
      new PrideContentId(result.uid),
      new PrideContentTypeDomain(
        new PrideContentUserName(result.pride.userName),
        new PrideContentUserPhotoURL(result.pride.userPhotoURL),
        new PrideContentTitle(result.pride.title),
        new PrideContentServiceName(result.pride.updated_at),
        new PrideContentCustomerName(result.pride.serviceName),
        new PrideContentSentence(result.pride.sentence),
        new PrideContentThumbsUsers(result.pride.thumbsUsers)
      )
    )

    return task
  }

  async find(id: number): Promise<null> {
    // const result = await this.taskDriver.find(id)

    // return this.convertTask(result[0])
    return null
  }

  async findAll(): Promise<PrideContent[]> {
    try {
      const results = await this.taskDriver.readThisMonthPrideList()

      return results.map((result: PrideContent) => {
        // console.log(result)
        return this.convertPrideList(result)
      })

    } catch (e) {
      throw e
    }
  }

  async create(content: String): Promise<null> {
    // try {
    //   const result = await this.taskDriver.create(content)

    //   return result
    // } catch (e) {
    //   throw e
    // }
    return null
  }

  async update(task: Task): Promise<null> {
    // try {
    //   const result = await this.taskDriver.update(task)

    //   return result
    // } catch (e) {
    //   throw e
    // }
    return null
  }

  async delete(id: number): Promise<any> {
    //   try {
    //     const result = await this.taskDriver.delete(id)

    //     return result
    //   } catch (e) {
    //     throw e
    //   }
    return null
  }

}