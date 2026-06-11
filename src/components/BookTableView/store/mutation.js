/*
====================================================
Vuex Mutations (mutation.js)
====================================================

역할
- Vuex State를 변경하는 함수 모음
- State를 수정하는 유일한 장소
- 반드시 commit()을 통해 호출된다.

예시

Action
 ↓
commit('SET_BOOKS', books)
 ↓
Mutation 실행
 ↓
state.books 변경
 ↓
화면 자동 갱신

----------------------------------------------------

왜 필요한가?

State를 아무 곳에서나 수정하면

어디서
언제
왜

변경되었는지 추적하기 어렵다.

Vuex는 상태 변경을 Mutation으로
강제하여 유지보수를 쉽게 만든다.

----------------------------------------------------

실행 흐름

Component
 ↓ dispatch()
Action
 ↓ commit()
Mutation
 ↓
State 변경
 ↓
UI 갱신

----------------------------------------------------

주의사항

가능
commit('SET_BOOKS', data)

불가능
state.books = data

State 직접 수정은 지양한다.

====================================================
*/

import * as types from '../store/mutation-type.js'

export default {

    /*
    ====================================================
    SET_BOOKS

    역할
    - 도서 목록 저장

    호출 예시

    commit('SET_BOOKS', res.data.list)

    실행 전

    state.books = []

    실행 후

    state.books = [
      { bookNo: 1, bookName: 'Java' }
    ]
    ====================================================
    */
    [types.SET_BOOKS](state, books){
        state.books = books
    },

    /*
    ====================================================
    SET_TOTAL_COUNT

    역할
    - 전체 데이터 건수 저장
    - 페이징 처리에 사용

    호출 예시

    commit('SET_TOTAL_COUNT', 150)

    결과

    state.totalCount = 150
    ====================================================
    */
    [types.SET_TOTAL_COUNT](state, totalCount){
        state.totalCount = totalCount
    },

    /*
    ====================================================
    SET_LOADING

    역할
    - 서버 통신 상태 저장

    true
      조회 중

    false
      조회 완료

    호출 예시

    commit('SET_LOADING', true)

    화면 예시

    <LoadingSpinner
      v-if="loading"
    />
    ====================================================
    */
    [types.SET_LOADING](state, loading){
        state.loading = loading
    },

    /*
    ====================================================
    SET_SEARCH_PARAM

    역할
    - 검색 조건 저장

    spread(...) 연산자를 사용하여
    기존 검색 조건은 유지하고
    변경된 값만 덮어쓴다.

    예시

    기존

    {
      pageNo: 1,
      numOfRows: 10,
      book: ''
    }

    commit('SET_SEARCH_PARAM', {
      book: 'Java'
    })

    결과

    {
      pageNo: 1,
      numOfRows: 10,
      book: 'Java'
    }

    pageNo, numOfRows는 유지되고
    book만 변경된다.

    ====================================================
    */
    [types.SET_SEARCH_PARAM](state, searchParam) {
        state.searchParam = {
            ...state.searchParam,
            ...searchParam
        }
    }
}