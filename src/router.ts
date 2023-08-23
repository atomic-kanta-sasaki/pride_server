import express = require('express')
import { TaskUseCase } from './usecase/task'
import { TaskGateway } from './gateway/taskGateway'
import { TaskResource } from './resource/taskResource'
import { MysqlConnection } from './db/mysqlConnection'
import { FirestoreConnection } from './db/firebaseConnection'
import { TaskDriver } from './infrastructure/task'
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from '@firebase/firestore'
import { PrideContentFirestoreDataType } from './interface/IContentType'

const today = new Date();
const collectionName = today.getFullYear() + '-' + (today.getMonth() + 1) + '-pride';
const prideDataConverter: FirestoreDataConverter<PrideContentFirestoreDataType> = {
  toFirestore(content: PrideContentFirestoreDataType): DocumentData {
    return content.pride;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): PrideContentFirestoreDataType {
    const data = snapshot.data(options);
    return {
      uid: snapshot.id,
      pride: {
        title: data.title,
        customerName: data.customerName,
        sentence: data.sentence,
        serviceName: data.serviceName,
        thumbsUsers: data.thumbsUsers,
        userName: data.userName,
        userPhotoURL: data.userPhotoURL,
      },
    };
  },
};
const mysqlConnection = new MysqlConnection()
const firebaseConnection = new FirestoreConnection(collectionName, prideDataConverter)
const taskDriver = new TaskDriver(firebaseConnection)
const taskGateway = new TaskGateway(taskDriver)
const taskUsecase = new TaskUseCase(taskGateway)
const taskResource = new TaskResource(taskUsecase)

const router = express.Router()

router.get('/tasks', async (req: express.Request, res: express.Response) => {
  const results = await taskResource.findAllTasks(req, res)
  res.send(results)
})

export default router