/*
====================================================
API Layer (api/index.js)
====================================================

역할
- 외부 API 호출 담당
- axios 설정 관리
- 서버 통신 코드 분리

----------------------------------------------------

현재 프로젝트 구조

Component
    ↓
Vuex Action
    ↓
api/index.js
    ↓
울산 공공데이터 API
    ↓
응답 반환

----------------------------------------------------

왜 분리하는가?

잘못된 예시

actions.js

const res = await axios.get(...)

문제점

- API 주소가 여러 곳에 흩어짐
- 유지보수 어려움
- 중복 코드 증가

----------------------------------------------------

좋은 예시

actions.js

const res = await api.getBookList()

장점

- API 변경 시 api 폴더만 수정
- 재사용 가능
- 코드 가독성 향상

----------------------------------------------------

실무 아키텍처

components
    ↓
store/actions
    ↓
api
    ↓
backend

UI와 서버 통신을 분리하여
유지보수성을 높인다.

====================================================
*/

import axios from "axios";

/*
====================================================
서비스 인증키

공공데이터 API 호출 시 사용

실제 운영 환경에서는

.env

파일에 저장하는 것이 권장된다.

예시

VITE_SERVICE_KEY=xxxxx

====================================================
*/
const SERVICE_KEY =
  "04724d2596c78695eae38fc9c61e9256d9db3591264904f6a1a225d2a78dd7eb";

/*
====================================================
Axios 인스턴스 생성

baseURL

/api

설정

실제 요청 주소

/api/6310000/ulsandata/getUlsandataList

개발환경에서는
vite.config.js proxy 설정과
연결되는 경우가 많다.

====================================================
*/
const api = axios.create({
  baseURL: "/api",
});

/*
====================================================
getBookList

역할
- 울산 도서 데이터 조회

매개변수

param

예시

{
  pageNo: 1,
  numOfRows: 10,
  book: 'Java'
}

----------------------------------------------------

실행 과정

Action
    ↓
getBookList(param)
    ↓
Axios GET 요청
    ↓
울산 API 호출
    ↓
XML 응답 반환
    ↓
Action으로 전달

----------------------------------------------------

params

serviceKey
- 인증키

...param
- 검색 조건

최종 요청 예시

/api/6310000/ulsandata/getUlsandataList
?serviceKey=xxxx
&pageNo=1
&numOfRows=10
&book=Java

====================================================
*/
export const getBookList = async (param) => {

  const response = await api.get(
    "/6310000/ulsandata/getUlsandataList",
    {
      params: {
        serviceKey: SERVICE_KEY,
        ...param
      }
    }
  );

  /*
  ==================================================
  Axios 응답 구조

  response = {

    data: 실제 응답 데이터

    status: HTTP 상태코드

    headers: 응답 헤더

  }

  현재 프로젝트에서는

  response.data

  만 반환한다.

  ==================================================
  */

  console.log(response);

  return response.data;
};