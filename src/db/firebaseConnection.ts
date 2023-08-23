import { addDoc, collection, getDocs, updateDoc, doc, FirestoreDataConverter, getDoc } from 'firebase/firestore';
import { db } from './authFirebase';
import { IFirebaseConnection } from './IFirebaseConnection';

export class FirestoreConnection extends IFirebaseConnection {
  private collectionName: string;
  private dataConverter: FirestoreDataConverter<any>;

  constructor(collectionName: string, dataConverter: FirestoreDataConverter<any>) {
    super();
    this.collectionName = collectionName;
    this.dataConverter = dataConverter;
  }

  private getCollectionRef() {
    return collection(db, this.collectionName).withConverter(this.dataConverter);
  }

  async create(data: any): Promise<void> {
    const collRef = this.getCollectionRef();
    await addDoc(collRef, data);
  }

  async read(): Promise<any[]> {
    const collRef = this.getCollectionRef();
    const snapshot = await getDocs(collRef);
    return snapshot.docs.map(doc => doc.data());
  }

  async readById(id: string): Promise<any | null> {
    const docRef = doc(db, this.collectionName, id).withConverter(this.dataConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async update(id: string, data: any): Promise<void> {
    const docRef = doc(db, this.collectionName, id).withConverter(this.dataConverter);
    await updateDoc(docRef, data);
  }
}
