import Link from 'next/link'
import { Dropdown, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

import { useLocalStorage } from '@/hooks'

const items: MenuProps['items'] = [
  {
    label: (
      <>
        <UserOutlined /> Profile
      </>
    ),
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <Link href="/login">
        <LogoutOutlined /> Logout
      </Link>
    ),
    key: '2',
  },
]

export default function AvatarDropdown() {
  const [role] = useLocalStorage('role')
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Avatar
        className="bg-[#001529] text-white cursor-pointer self-center"
        // size={'small'}
      >
        {(role as string)?.substring(0, 1)}
      </Avatar>
    </Dropdown>
  )
}
