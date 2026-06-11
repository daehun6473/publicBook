/*
====================================================
Vuex Actions (actions.js)
====================================================

역할
- 비동기 처리 담당
- API 호출 담당
- 데이터 가공 담당
- Mutation 호출(commit)

Vuex 데이터 흐름

Component
    ↓ dispatch()
Action
    ↓ API 호출
    ↓ 데이터 가공
    ↓ commit()
Mutation
    ↓
State 변경
    ↓
화면 갱신

----------------------------------------------------

왜 필요한가?

API 호출은 시간이 걸린다.

Mutation은 동기 처리만 가능하기 때문에
비동기 작업은 Action에서 수행한다.

예시

await api.getBookList()

위 코드는 서버 응답을 기다리는
비동기 작업이다.

따라서 Mutation이 아닌
Action에서 처리해야 한다.

----------------------------------------------------

현재 프로젝트 동작

1. 검색 버튼 클릭
2. dispatch('getBookList')
3. API 호출
4. XML 응답 수신
5. XML → JavaScript 객체 변환
6. commit('SET_BOOKS')
7. commit('SET_TOTAL_COUNT')
8. 화면 갱신

----------------------------------------------------

면접 질문

Q. Action의 역할은?

A.
비동기 처리와 API 호출을 담당하며
Mutation을 호출하여 State를 변경한다.

Q. Mutation에서 API 호출하면 안되나요?

A.
Mutation은 동기 처리만 수행해야 하므로
API 호출은 Action에서 처리한다.

====================================================
*/

import * as api from './api/index.js'

export default {

  /*
  ====================================================
  getBookList

  역할
  - 도서 목록 조회
  - XML 응답 파싱
  - Store 저장

  호출

  dispatch('getBookList')

  ====================================================
  */
  async getBookList({ commit, state }) {

    try {

      /*
      ==================================================
      로딩 시작

      화면에서 Spinner를 보여주기 위해
      loading 상태를 true로 변경

      commit
        ↓
      mutation 실행
        ↓
      state.loading = true

      ==================================================
      */
      commit('SET_LOADING', true)

      /*
      ==================================================
      현재 검색 조건 조회

      state.searchParam

      예시

      {
        pageNo: 1,
        numOfRows: 10,
        book: 'Java'
      }

      ==================================================
      */
      const param = state.searchParam

      console.log(param)

      /*
      ==================================================
      API 호출

      현재 검색 조건을 서버로 전달

      await 사용 이유

      서버 응답이 올 때까지
      다음 코드를 기다린다.

      ==================================================
      */
      const res = await api.getBookList(param)

      /*
      ==================================================
      XML 문자열 파싱

      서버 응답(XML)
            ↓
      DOM 객체
            ↓
      querySelector 사용 가능

      ==================================================
      */
      const parser = new DOMParser()

      const xmlDoc = parser.parseFromString(
        res.trim(),
        'application/xml'
      )

      /*
      ==================================================
      list 태그 조회

      XML 예시

      <list>
        ...
      </list>

      ==================================================
      */
      const list =
        xmlDoc.querySelectorAll('list')

      /*
      ==================================================
      XML → JavaScript 객체 변환

      map() 사용

      XML

      <ulsandataTitle>자바</ulsandataTitle>

      ↓

      {
        title: '자바'
      }

      최종적으로 화면에서 사용 가능한
      배열 형태로 변환한다.

      ==================================================
      */
      const books = [...list].map(item => ({

        bookNo:
          item.querySelector('ulsandataEntId')
            ?.textContent,

        title:
          item.querySelector('ulsandataTitle')
            ?.textContent,

        author:
          item.querySelector('ulsandataAuthor')
            ?.textContent,

        pub:
          item.querySelector('ulsandataPub')
            ?.textContent,

        year:
          item.querySelector('ulsandataPubDate')
            ?.textContent,

        price:
          item.querySelector('ulsandataPrice')
            ?.textContent,

        bookState:
          item.querySelector('ulsandataState')
            ?.textContent

      }))

      /*
      ==================================================
      전체 건수 조회

      페이징 처리에 사용

      예시

      totalCount = 125

      ==================================================
      */
      const totalCount =
        xmlDoc.querySelector('totalCount')
          ?.textContent

      /*
      ==================================================
      도서 목록 저장

      commit
        ↓
      SET_BOOKS mutation
        ↓
      state.books 변경

      ==================================================
      */
      commit('SET_BOOKS', books)

      console.log(books)

      /*
      ==================================================
      전체 건수 저장

      commit
        ↓
      SET_TOTAL_COUNT mutation
        ↓
      state.totalCount 변경

      ==================================================
      */
      commit(
        'SET_TOTAL_COUNT',
        Number(totalCount)
      )

    } catch(error) {

      /*
      ==================================================
      예외 처리

      API 오류
      XML 파싱 오류

      등을 처리

      ==================================================
      */
      console.error(error)

    } finally {

      /*
      ==================================================
      로딩 종료

      성공/실패 여부와 상관없이
      항상 실행된다.

      ==================================================
      */
      commit('SET_LOADING', false)

    }

  }
}