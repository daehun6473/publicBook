import * as types from '../store/mutation-type.js'

export default{
    [types.SET_BOOKS](state, books){
        state.books = books
    },
    [types.SET_TOTAL_COUNT](state, totalCount){
        state.totalCount = totalCount
    },
    [types.SET_LOADING](state, loading){
        state.loading = loading
    },
    [types.SET_SEARCH_PARAM](state, searchParam) {
        state.searchParam = {
            ...state.searchParam,
            ...searchParam
        }
    }
}

// export default mutation