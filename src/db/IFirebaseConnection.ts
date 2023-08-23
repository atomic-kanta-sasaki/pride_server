export abstract class IFirebaseConnection {
  abstract create(data: any): Promise<void>;
  abstract read(query?: any): Promise<any[]>;
  abstract update(id: string, data: any): Promise<void>;
}
