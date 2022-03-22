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
