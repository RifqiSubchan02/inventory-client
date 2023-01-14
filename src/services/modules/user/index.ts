import Axios from '@/services/api'
import type { QueryFunctionContext } from '@tanstack/react-query'

export async function getUser(ctx: QueryFunctionContext) {
  const { queryKey } = ctx
  const [_key, params] = queryKey

  const result = await Axios.get('/user', { params })

  return result.data
}
