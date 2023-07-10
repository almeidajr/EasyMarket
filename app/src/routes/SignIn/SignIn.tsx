import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { LoginForm, ProFormText } from '@ant-design/pro-form'
import { message } from 'antd'

import { useAuth } from '../../hooks/useAuth'
import { SubTitle } from './SubTitle'

interface Credentials {
  email: string
  password: string
}

export const SignIn = () => {
  const { signIn } = useAuth()

  const handleSubmit = async (credentials: Credentials) => {
    const hide = message.loading(
      'Aguarde, realizando processo de autenticação...',
      0,
    )

    try {
      await signIn(credentials)
      message.success('Autenticação realizada com sucesso!')
    } catch (error) {
      message.error(
        'Suas credencias de login não coincidem com uma conta em nosso sistema.',
      )
    } finally {
      hide()
    }
  }

  return (
    <LoginForm
      autoFocusFirstInput
      onFinish={handleSubmit}
      subTitle={<SubTitle />}
      title="EasyMarket"
    >
      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined className={'prefixIcon'} />,
          autoComplete: 'email',
          type: 'email',
        }}
        name="email"
        placeholder={'Email'}
        rules={[
          {
            required: true,
            message: 'Insira um endereço de email válido',
            type: 'email',
          },
        ]}
      />
      <ProFormText.Password
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={'prefixIcon'} />,
          autoComplete: 'current-password',
        }}
        name="password"
        placeholder={'Senha'}
        rules={[
          {
            required: true,
            message: 'Digite a senha da sua conta',
          },
        ]}
      />
    </LoginForm>
  )
}
