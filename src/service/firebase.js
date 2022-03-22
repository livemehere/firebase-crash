import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

class FirebaseManager {
  constructor(config) {
    this.firebaseApp = initializeApp(config);
    this.db = getFirestore();
  }

  async createDoc(collectionName, data) {
    if (typeof data !== "object") return;

    let docRef;
    try {
      docRef = await addDoc(collection(this.db, collectionName), data);
    } catch (e) {
      console.error(e);
    }
    return docRef.id;
  }

  async createDocByPath(path, data) {
    if (typeof data !== "object") return;

    let docRef;
    try {
      docRef = await addDoc(collection(this.db, path), data);
    } catch (e) {
      console.error(e);
    }
    return docRef.id;
  }

  async readDocs(collectionName) {
    const docs = [];
    try {
      const querySnapshot = await getDocs(collection(this.db, collectionName));
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
    } catch (e) {
      console.log(e);
    }
    return docs;
  }

  async readDocsByPath(path) {
    const docs = [];
    try {
      const querySnapshot = await getDocs(collection(this.db, path));
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
    } catch (e) {
      console.log(e);
    }
    return docs;
  }
  /*
   * doc을 사용하는 두 가지 방법
   * 1. doc(this.db, collection, doc)
   * 2. doc(this.db, 'collection/doc')
   *
   * 하나의 doc을 읽을땐 getDoc()을 사용한다.
   * */

  async readDoc(collectionName, targetDocID) {
    let targetDoc;
    const targetDocRef = doc(this.db, collectionName, targetDocID); // or collection(db, 'users');
    try {
      targetDoc = await getDoc(targetDocRef);
    } catch (e) {
      console.log(e);
    }
    return targetDoc.data();
  }

  // 이렇게 하면 하위 컬렉션을 계속 탐지해 나갈 수 있음
  async readDocByPath(path) {
    let targetDoc;
    const targetDocRef = doc(this.db, path);
    try {
      targetDoc = await getDoc(targetDocRef);
    } catch (e) {
      console.log(e);
    }
    return targetDoc.data();
  }
}

export const firebaseManager = new FirebaseManager(firebaseConfig);
