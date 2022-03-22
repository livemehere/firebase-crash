import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
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

  // set doc 은 만들거나 덮어씀, but  merge 옵션을 주면, 덮어쓰지않고, 바뀐데이터와, 추가된 데이터만 업데이트함
  async createDocWithID(path, data) {
    if (typeof data !== "object") return;

    let result;
    const collectionRef = doc(this.db, path);
    try {
      result = await setDoc(collectionRef, data, { merge: true });
    } catch (e) {
      console.log(e);
    }
    return result;
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

  async readDocsWithCondition(collectionName) {
    let result = [];
    const collectionRef = collection(this.db, collectionName);
    try {
      const querySnapshot = await getDocs(
        query(collectionRef, where("view", ">", 2))
      );
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
    } catch (e) {
      console.log(e);
    }
    return result;
  }

  async updateDoc(path, data) {
    if (typeof data !== "object") return;

    const docRef = doc(this.db, path);
    let result;
    try {
      result = await updateDoc(docRef, data);
    } catch (e) {
      console.log(e);
    }
    return result;
  }

  async deleteDocWithID(path, docID) {
    const docRef = doc(this.db, path, docID);

    await deleteDoc(docRef);
  }

  async deleteFieldWithID(path, docID, field) {
    const docRef = doc(this.db, path, docID);
    await updateDoc(docRef, {
      ["field"]: deleteField(),
    });
  }
}

export const firebaseManager = new FirebaseManager(firebaseConfig);
