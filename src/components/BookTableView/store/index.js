/*
====================================================
Vuex Store 생성 파일 (store/index.js)
====================================================

역할
- Vue 애플리케이션의 전역 상태 저장소(Store)를 생성한다.
- state, mutations, actions를 하나로 묶어 관리한다.
- main.js에서 app.use(store)로 등록하여
  모든 컴포넌트에서 접근할 수 있게 된다.

Vuex 구조

Component
   │
   ├─ dispatch()
   ▼
 Actions
   │
   ├─ commit()
   ▼
 Mutations
   │
   ├─ state 변경
   ▼
 State
   │
   ▼
 화면 자동 갱신

----------------------------------------------------
각 파일의 역할

state.js
- 전역 데이터 저장
- 예) 도서목록, 검색조건, 로딩상태

mutation.js
- state를 변경하는 함수들
- 반드시 동기 처리만 수행

actions.js
- API 호출 및 비동기 처리 담당
- mutation 호출(commit)

----------------------------------------------------
왜 사용하는가?

컴포넌트가 많아질수록
props 전달이 복잡해진다.

Vuex를 사용하면
여러 컴포넌트가 같은 데이터를
공유할 수 있다.

예시

검색 컴포넌트
      ↓
Vuex Store
      ↑
목록 컴포넌트

검색 결과를 Store에 저장하면
모든 컴포넌트가 같은 데이터를 사용 가능

----------------------------------------------------
면접 질문

Q. Vuex Store의 역할은?

A.
애플리케이션의 전역 상태를 중앙에서 관리하기 위한 저장소이다.

Q. state를 직접 수정하면 안되는 이유는?

A.
상태 변경 이력을 추적하기 어렵기 때문에
반드시 mutation을 통해 수정해야 한다.

Q. action과 mutation의 차이는?

A.
action은 비동기 처리,
mutation은 state 변경을 담당한다.
====================================================
*/

import { createStore } from 'vuex'

import state from './state'
import mutations from './mutation'
import actions from './actions'

export default createStore({
    state,
    mutations,
    actions
})