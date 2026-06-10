import * as api from './api/index.js'

export default {

  async getBookList({ commit, state }) {

    try {

      commit('SET_LOADING', true)

      const param = state.searchParam
      console.log(param);
      

      const res = await api.getBookList(param)

      const parser = new DOMParser()

      const xmlDoc = parser.parseFromString(
        res.trim(),
        'application/xml'
        )

      const list =
        xmlDoc.querySelectorAll('list')

      const books = [...list].map(item => ({


        bookNo:
          item.querySelector('ulsandataEntId')?.textContent,

        title:
          item.querySelector('ulsandataTitle')?.textContent,

        author:
          item.querySelector('ulsandataAuthor')?.textContent,

        pub:
          item.querySelector('ulsandataPub')?.textContent,

        year:
          item.querySelector('ulsandataPubDate')?.textContent,

        price:
          item.querySelector('ulsandataPrice')?.textContent,

        bookState:
          item.querySelector('ulsandataState')?.textContent

      }))

      const totalCount =
        xmlDoc.querySelector('totalCount')
          ?.textContent
      commit('SET_BOOKS', books)
      console.log(books);
      

      commit(
        'SET_TOTAL_COUNT',
        Number(totalCount)
      )

    } catch(error) {

      console.error(error)

    } finally {

      commit('SET_LOADING', false)

    }

  },

//   async getBookDetail({ commit, state }) {

//     try {

//       commit('SET_LOADING', true)

//       const param = state.searchParam
//       console.log(param);
      

//       const res = await api.getBookDetail(param)

//       const parser = new DOMParser()

//       const xmlDoc = parser.parseFromString(
//         res.trim(),
//         'application/xml'
//         )

//       const list =
//         xmlDoc.querySelectorAll('list')

//       const books = [...list].map(item => ({


//     bookNo:
//         item.querySelector("ulsandataEntId")?.textContent,

//     title:
//         item.querySelector("ulsandataTitle")?.textContent,

//     author:
//         item.querySelector("ulsandataAuthor")?.textContent,

//     pub:
//         item.querySelector("ulsandataPub")?.textContent,

//     year:
//         item.querySelector("ulsandataPubDate")?.textContent,

//     regDate:
//         item.querySelector("ulsandataRegDate")?.textContent,

//     markNo: 
//         item.querySelector("ulsandataMarkNo")?.textContent,

//     // ulsandataClas	분류기호
//     // ulsandataAuth	도서기호

//     clasify:
//         item.querySelector("ulsandataClas")?.textContent,
        
//     auth:
//         item.querySelector("ulsandataAuth")?.textContent,

//     bookState:
//       item.querySelector("ulsandataState")?.textContent

//       }))

//       const totalCount =
//         xmlDoc.querySelector('totalCount')
//           ?.textContent
//       commit('SET_BOOKS', books)
//       console.log(books);
      

//       commit(
//         'SET_TOTAL_COUNT',
//         Number(totalCount)
//       )

//     } catch(error) {

//       console.error(error)

//     } finally {

//       commit('SET_LOADING', false)

//     }

//   }

}