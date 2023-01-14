import axios from 'axios'
import { getFromStorage } from '@/utils/storage'

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    common: {
      Authorization: `Bearer ${getFromStorage('accessToken')}`,
    },
  },
})

export default Axios
