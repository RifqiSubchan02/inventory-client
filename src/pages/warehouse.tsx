import type { ReactElement } from 'react'
import Head from 'next/head'
import { MainLayout } from '@/components'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Warehouse</title>
      </Head>
      <div>Warehouse</div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
