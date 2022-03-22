import { db, firebaseManager } from "./service/firebase";
import { useEffect, useState } from "react";

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
    // const doc = await firebaseManager.readDoc('posts', '9weQq1QhOBvzKdWySzWi');
    const doc = await firebaseManager.readDocByPath(
      "posts/lfj3n4JJg2QmvJLJlCgG/comments/mFknQBVo44w45gqJsDV4"
    );
    console.log(doc);
  };

  return (
    <div className="App">
      <h1>Firebase 파해치기</h1>
      <button onClick={handleCreateDoc}>특정 컬렉션에 Doc 생성하기</button>
      <button onClick={handleReadDocs}>특정 컬렉션에 Doc 모두 읽기</button>
      <button onClick={handleReadDoc}>특정 컬렉션에 특정 Doc 읽기</button>
    </div>
  );
}

export default App;
