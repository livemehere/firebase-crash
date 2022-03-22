# Firebase를 완벽하게 파해쳐보기 프로젝트

## 목표

1. Firebase를 Javascript 환경에서 완벽하게 다룰 수 있다.
2. Firebase의 모든 서비스를 사용해본다.
3. Firebase의 모든 라이브러리들의 용도와 차이를 이해한다.
4. Firebase Firestore DB를 자유롭게 쿼리할 수 있다
5. 실제 배포까지 할 수 있다.
6. analistic 을 사용하여 분석과 모니터링을 할 수 있다.
7. 과금 정책에대해 잘 이해하고 있다.

## 배운점

### subcollection

하위컬렉션 조회가 어려웠었는데 Ref를 만들어서, collectionRef 든 docRef 든 만들어 특정 collection이나 doc을 타켓할 수있다.

그리고 그 Ref는 손쉽게 string 형태로 작성하면된다.

예를 들면 `projects/[PROJECT_ID]/databases/[DATABASE_ID]/documents/[DOCUMENT_PATH]`입니다.

### 단일 쿼리

getDocs(query(Ref,condition)) 꼴로 작성하면 된다

```js
const collectionRef = collection(this.db, collectionName);

getDocs(query(collectionRef, where("view", ">", 2)));
```

### addDoc(), setDoc()

둘은 완전히 동일한 기능을 한다

단, addDoc()은 docID가 자동생성되고, setDoc()은 docID를 직접 지정해주어야된다.

그리고 setDoc()은 중복된 docID를 생성하면 덮어쓰며, merge()옵션을 주면 update()와 같은 효과이다.

### serverTimestamp()

업데이트 시기를 timestamp한다.

근데, 업데이트마다 속성에 추가해주어야한다.(한번만들어놨다고 알아서하는게아니라, 업데이트시에 자꾸 필드로 넣어줘야함)

> 이럴꺼면 그냥 new Date() 하면 되는거 아닌가?

### 객체 필드의 특정 데이터만 변경하는법

key값을 점표기법으로 해주면된다. 그러면 다른 중첩필드를 덮어쓰지않고, 단일 중첩 필드만 업데이트가 된다.

````js
    const result = await firebaseManager.updateDoc("posts/kongdata", {
      "bag.boy": "yyyyy",
    });
    ```
````

### 배열요소 업데이트 방법

그냥 필드값을 업데이트하며 덮어써져 버리니까

```js
rooms: arrayUnion("hark"),
rooms: arrayRemove(3),
```

### 숫자 증가,감소

increment()하나로, 감소시에는 음수를, 증가시엔 양수를 넣어준다.

```js
      "bag.cola": increment(-20),

```

### field를 제거할때 함수 인자를 key값으로 사용하려면

key를 [string]로 값싸주어야한다.

```js
  async deleteFieldWithID(path, docID, field) {
    const docRef = doc(this.db, path, docID);
    await updateDoc(docRef, {
      ["field"]: deleteField(),
    });
  }

```
