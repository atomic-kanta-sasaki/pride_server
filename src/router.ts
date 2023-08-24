import express = require('express')
import { PrideContentUseCase } from './usecase/task'
import { PrideGateway } from './gateway/prideGateway'
import { TaskResource } from './resource/prideContentResource'
import { MysqlConnection } from './db/mysqlConnection'
import { FirestoreConnection } from './db/firebaseConnection'
import { PrideDriver } from './infrastructure/prideDriver'
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from '@firebase/firestore'
import { PrideContentFirestoreDataType } from './interface/IContentType'

const today = new Date();
const collectionName = today.getFullYear() + '-' + (today.getMonth() + 1) + '-pride';
// TODO これどこで定義したらいいかよくわからん
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
const taskDriver = new PrideDriver(firebaseConnection)
const taskGateway = new PrideGateway(taskDriver)
const taskUsecase = new PrideContentUseCase(taskGateway)
const taskResource = new TaskResource(taskUsecase)

const router = express.Router()

router.get('/tasks', async (req: express.Request, res: express.Response) => {
  const results = await taskResource.findAllPrideContents(req, res)
  res.send(results)
})

export default router
