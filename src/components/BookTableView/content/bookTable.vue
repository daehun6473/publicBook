<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>도서번호</th>
          <th>자료명</th>
          <th>저자</th>
          <th>발행처</th>
          <th>발행년도</th>
          <th>가격</th>
          <th>소장상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" @click=getbookDetail(book.bookNo) :key="book.bookNo" class="selectBook">
          <td>{{ book.bookNo }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.pub }}</td>
          <td>{{ book.year }}</td>
          <td>{{ book.price }}</td>
          <td>{{ convertState(book.bookState) }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore();
const books = computed(() => store.state.books);

const convertState = (state) => {
  switch (state) {
    case "B":
      return "소장중";
    case "C":
      return "대출중";
    case "L":
      return "분실";
    case "D":
      return "훼손";
    case "S":
      return "폐기";
    default:
      return state;
  }
};

// const getbookDetail = async(bookNo) => {
//     console.log(bookNo);
    
//     store.commit(
//         'SET_SEARCH_PARAM', {
//         pageNo: 1,
//         bookNo,
//         numOfRows: 1
//     }
//     )
//     await store.dispatch('getBookDetail')


//   }

</script>


<style scoped>
.container {
    border: 2px solid black;
  max-width: 1200px;
  /* margin: 30px auto; */
}

h1 {
  margin-bottom: 20px;
}

table {
  max-width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  color: black;
}

th {
  background: #2c3e50;
  color: white;
}

tr:nth-child(even) {
  background: #f5f5f5;
}

.selectBook:hover{
  cursor: pointer;
  outline: 3px solid #2c3e50;
}
</style>
