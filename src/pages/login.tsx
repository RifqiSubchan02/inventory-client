import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'

import { login } from '@/services/modules/auth'
import { saveToStorage } from '@/utils/storage'

const { Title } = Typography

interface LoginForm {
  email: string
  password: string
  remember: boolean
}

export default function Login() {
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      saveToStorage('accessToken', data.data.accessToken)
      saveToStorage('role', data.data.role)
      router.push('/')
    },
  })

  function onFinish({ email, password, remember }: LoginForm) {
    mutate({ email, password })
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex h-full content-center justify-center">
        <div className="w-80 self-center m-4">
          <Title>Login</Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
