import type { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import { MainLayout } from '@/components'

export default function Dashboard() {
  return <div>Dashboard</div>
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
