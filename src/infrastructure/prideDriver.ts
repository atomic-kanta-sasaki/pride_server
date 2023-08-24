import { FirestoreConnection } from '../db/firebaseConnection';
import { PrideContent } from '../domain/pride';

export class PrideDriver {
  private dbConnection: FirestoreConnection;


  constructor(connection: FirestoreConnection) {
    this.dbConnection = connection;
  }

  async createPride(content: any): Promise<void> {
    await this.dbConnection.create({ uid: 'dummy_id', pride: content });
  }

  async readThisMonthPrideList(): Promise<PrideContent[]> {
    return await this.dbConnection.read();
  }

  async pushLikeForPride(uid: string, photoURL: string): Promise<void> {
    const data = await this.dbConnection.readById(uid);
    if (!data) return;

    const thumbsUsers = data.pride.thumbsUsers;
    const registerThumbsUser = Array.from(new Set([...thumbsUsers, photoURL]));

    await this.dbConnection.update(uid, { thumbsUsers: registerThumbsUser });
  }
}
