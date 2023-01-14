import type { ReactNode } from 'react'
import type { MenuProps } from 'antd'

import { createElement, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { Layout, Menu, theme, Space } from 'antd'
import {
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons'

import { AvatarDropdown } from '@/components'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Dashboard', '/', <PieChartOutlined />),
  getItem('Warehouse', '/warehouse', <HomeOutlined />),
  getItem('User', '/user', <UserOutlined />),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
]

export default function MainLayout({ children }: { children?: ReactNode }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)

  const router = useRouter()

  const [root, sub] = router.pathname?.split('/')

  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        className="h-screen overflow-auto !fixed inset-y-0 left-0 duration-300"
      >
        <div className="sticky top-0 p-4 z-10 bg-[#001529]">
          <div className="flex h-8 items-center">
            <Link href="/">
              <Space>
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={35}
                  height={35}
                />
                <span hidden={collapsed} className="text-white">
                  NextJS Invent
                </span>
              </Space>
            </Link>
          </div>
        </div>
        <Menu
          rootClassName=""
          theme="dark"
          mode="inline"
          defaultOpenKeys={['/' + root]}
          selectedKeys={['/' + (sub && sub !== '[id]' ? sub : root)]}
          items={items}
          onClick={({ key }) => router.push(key)}
        />
      </Sider>
      <Layout
        className={`duration-300 min-h-screen ${
          collapsed ? 'ml-20' : 'ml-[200px]'
        }`}
      >
        <Header
          className="sticky flex top-0 !p-0 !p-4 justify-between drop-shadow"
          style={{ background: colorBgContainer }}
        >
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'text-lg self-center',
            onClick: () => setCollapsed(!collapsed),
          })}
          <AvatarDropdown />
        </Header>

        <Content className="my-6 mx-4">
          {children}
          {/* <p>long content</p>
          {
            // indicates very long content
            Array.from({ length: 100 }, (_, index) => (
              <Fragment key={index}>
                {index % 20 === 0 && index ? 'more' : '...'}
                <br />
              </Fragment>
            ))
          }
          <p>end</p> */}
        </Content>
        <Footer className="text-center border border-gray-300 !bg-white !p-3 drop-shadow">
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
