import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function LoginForm() {
  const translate = useLanguage();

  return (
    <div>
      <Form.Item
        label={translate('email')}
        name="email"
        rules={[{ required: true }, { type: 'email' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={'email@example.com'}
          type="email"
          size="large"
          style={{ borderRadius: '7px' }}
        />
      </Form.Item>

      <Form.Item label={translate('password')} name="password" rules={[{ required: true }]}>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={'*******'}
          size="large"
          style={{ borderRadius: '7px' }}
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>{translate('Remember me')}</Checkbox>
        </Form.Item>
        <a className="login-form-forgot" href="/forgetpassword" style={{ marginLeft: '0px' }}>
          {translate('Forgot password')}
        </a>
      </Form.Item>
    </div>
  );
}
