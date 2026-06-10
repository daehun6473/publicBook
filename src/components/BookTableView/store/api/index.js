import axios from "axios";

const SERVICE_KEY = "04724d2596c78695eae38fc9c61e9256d9db3591264904f6a1a225d2a78dd7eb";

const api = axios.create({
  baseURL: "/api",
});

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

  console.log(response);
  return response.data;
};

// export const getBookDetail = async (param) => {
//   const response = await api.get(
//     "/6310000/ulsandata/getUlsandataList",
//     {
//       params: {
//         serviceKey: SERVICE_KEY,
//         ...param
//       }
//     }
//   );

//   console.log(response);
//   return response.data;
// };
