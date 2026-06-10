<template>
    <div class="searchArea">
        <div class="searchBox">
            <label>도서번호 검색</label>
            <input v-model="bookNo" class="inputBar" type="text" placeholder="검색할 도서번호를 입력하세요" />
            <button @click="searchBookNo" class="searchBtn">검색</button>
        </div>

        <div class="pageBox">
            <button @click="prePage" class="pageBtn">◀</button>
            <span class="pageInfo">
                {{ $store.state.searchParam.pageNo }} 페이지
            </span>
            <button @click="nextPage" class="pageBtn">▶</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const bookNo = ref('');
const numOfRows = ref('');

const searchBookNo = async () => {
    let rowCount = '';
    if(bookNo.value?.trim()){
        rowCount = 1;
    }else{
        rowCount = 20;
    }

    store.commit(
        'SET_SEARCH_PARAM', {
        pageNo: 1,
        bookNo: bookNo.value,
        numOfRows: rowCount
    }
    )
    await store.dispatch('getBookList')
}

const nextPage = async () => {
    store.commit(
        'SET_SEARCH_PARAM', {
        pageNo: store.state.searchParam.pageNo + 1
    }
    )
    await store.dispatch('getBookList')
}

const prePage = async () => {

    if (store.state.searchParam.pageNo < 1) {
        return
    }

    store.commit(
        'SET_SEARCH_PARAM', {
        pageNo: store.state.searchParam.pageNo - 1
    }
    )
    await store.dispatch('getBookList')
}

</script>

<style>
.searchArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 90%;

    margin-bottom: 20px;
    padding: 16px 20px;

    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.searchBox {
    display: flex;
    align-items: center;
    gap: 12px;
}

.searchBox label {
    font-weight: 600;

    color: #2c3e50;
    white-space: nowrap;
}

.inputBar {
    width: 350px;
    height: 40px;

    padding: 0 12px;

    border: 1px solid #dcdcdc;
    border-radius: 6px;

    font-size: 14px;

    transition: all 0.2s ease;
}

.inputBar:focus {
    outline: none;
    border-color: #2c3e50;
}

.searchBtn {
    height: 40px;

    padding: 0 20px;

    border: none;
    border-radius: 6px;

    background: #2c3e50;
    color: white;

    font-weight: 600;

    cursor: pointer;

    transition: 0.2s;
}

.searchBtn:hover {
    background: #34495e;
}

.pageBox {
    display: flex;
    gap: 8px;
}

.pageBtn {
    width: 40px;
    height: 40px;

    border: 1px solid #ddd;
    border-radius: 6px;

    background: white;

    cursor: pointer;

    transition: 0.2s;
}

.pageBtn:hover {
    background: #f5f5f5;
    border-color: #2c3e50;
}

.pageInfo {
    color: black;
}
</style>
