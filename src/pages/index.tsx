import type { ReactElement } from 'react'
import { MainLayout } from '@/components'

export default function Home() {
  return <div>Home</div>
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
