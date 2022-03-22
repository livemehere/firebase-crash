import { db, firebaseManager } from "./service/firebase";
import { useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  increment,
  serverTimestamp,
} from "firebase/firestore";

function App() {
  const handleCreateDoc = async () => {
    // const createdDocId = await firebaseManager.createDoc('posts', {
    //     love:'ha ji hyung'
    // })
    const createdDocId = await firebaseManager.createDocByPath(
      "posts/lfj3n4JJg2QmvJLJlCgG/comments",
      {
        content: "두번쨰 덧글이야!",
      }
    );
    console.log(createdDocId);
  };
  const handleReadDocs = async () => {
    // const docs = await firebaseManager.readDocs('posts');
    const docs = await firebaseManager.readDocsByPath(
      "posts/lfj3n4JJg2QmvJLJlCgG/comments"
    );
    console.log(docs);
  };

  const handleReadDoc = async () => {
    const doc = await firebaseManager.readDoc("posts", "kongdata");
    // const doc = await firebaseManager.readDocByPath(
    //   "posts/lfj3n4JJg2QmvJLJlCgG/comments/mFknQBVo44w45gqJsDV4"
    // );
    console.log(doc);
  };

  const handleReadDocWithCondition = async () => {
    const docs = await firebaseManager.readDocsWithCondition("posts");
    console.log(docs);
  };

  const handlecreateDocWithID = async () => {
    const createdDocID = await firebaseManager.createDocWithID(
      "posts/kongdata",
      {
        name: "ff",
        job: "간호사",
        rooms: [1, 2, 3, 22],
        bag: {
          item: 1,
          cola: 1,
          boy: "no",
        },
        timestamp: serverTimestamp(),
      }
    );
    console.log(createdDocID);
  };
  const handleUpdateDoc = async () => {
    const result = await firebaseManager.updateDoc("posts/kongdata", {
      "bag.cola": increment(-20),
    });
    console.log(result);
  };

  const handleDeleteDoc = async () => {
    await firebaseManager.deleteDocWithID("posts", "9weQq1QhOBvzKdWySzWi");
  };

  const handleDeleteField = () => {
    firebaseManager.deleteFieldWithID("posts", "lfj3n4JJg2QmvJLJlCgG", "user");
  };
  return (
    <div className="App">
      <h1>Firebase 파해치기</h1>
      <button onClick={handleCreateDoc}>특정 컬렉션에 Doc 생성하기</button>
      <button onClick={handleReadDocs}>특정 컬렉션에 Doc 모두 읽기</button>
      <button onClick={handleReadDoc}>특정 컬렉션에 특정 Doc 읽기</button>
      <button onClick={handleReadDocWithCondition}>
        특정 컬렉션에 조건으로 Doc 읽기
      </button>
      <button onClick={handlecreateDocWithID}>
        특정 컬렉션에 특정 Doc 생성하는데 ID까지 직접
      </button>
      <button onClick={handleUpdateDoc}>특정 Doc 업데이트</button>
      <button onClick={handleDeleteDoc}>특정 Doc 제거</button>
      <button onClick={handleDeleteField}>특정 Doc 의 field 제거</button>
    </div>
  );
}

export default App;
