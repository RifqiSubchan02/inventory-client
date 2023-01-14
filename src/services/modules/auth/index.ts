import Axios from '@/services/api'

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const res = await Axios.post('/auth/login', {
    email,
    password,
  })
  return res.data
}
