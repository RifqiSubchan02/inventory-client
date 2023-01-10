import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'

const { Title } = Typography

export default function Login() {
  const router = useRouter()
  function onFinish(values: any) {
    console.log('Received values of form: ', values)
  }
  function onCancel() {
    router.push('/')
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
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
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
              <Button onClick={onCancel}>Cancel</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
