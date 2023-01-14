import type { ReactElement } from 'react'
import type {
  ColumnsType,
  TableProps,
  TablePaginationConfig,
} from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

import { useState } from 'react'
import Head from 'next/head'
import { Table } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { MainLayout } from '@/components'
import { getUser } from '@/services/modules/user'

interface DataType {
  name: string
  email: string
}

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue | null>
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    // onFilter: (value: string | number | boolean, record) =>
    //   record.name.startsWith(value as string),
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    sorter: (a, b) => a.email.length - b.email.length,
    width: '30%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
  },
]

export default function User() {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 2,
      size: 'small',
      showSizeChanger: true,
      showQuickJumper: true,
      defaultPageSize: 1,
      pageSizeOptions: ['1', '2'],
    },
  })

  const { isLoading, data } = useQuery({
    queryKey: [
      'user',
      {
        page: tableParams.pagination?.current,
        pageSize: tableParams.pagination?.pageSize,
      },
    ],
    queryFn: getUser,
    onSuccess: data => {
      setTableParams(value => {
        return {
          pagination: {
            ...value.pagination,
            total: data.totalCount,
          },
        }
      })
    },
  })

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const sortField = (sorter as SorterResult<DataType>)?.field as string
    const sortOrder = (sorter as SorterResult<DataType>)?.order as string

    setTableParams({
      pagination,
      filters,
      sortField: sortOrder && sortField,
      sortOrder,
    })
  }

  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <div className="bg-white h-full rounded-md drop-shadow p-6">
        <Table
          columns={columns}
          dataSource={data?.data}
          onChange={onChange}
          loading={isLoading}
          rowKey="id"
          pagination={tableParams.pagination}
        />
      </div>
    </>
  )
}

User.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
