import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormText } from '@ant-design/pro-form'
import { message } from 'antd'

import { useAuth } from '../../hooks/useAuth'
import { httpClient } from '../../utils/httpClient'
import { SubTitle } from './SubTitle'

interface User {
  name: string
  email: string
  password: string
}

export const SignUp = () => {
  const { signIn } = useAuth()

  const handleSubmit = async ({ name, email, password }: User) => {
    let hide = message.loading('Aguarde, estamos criando sua nova conta...', 0)
    try {
      await httpClient.post('users', {
        name,
        email,
        password,
        passwordConfirm: password,
      })
      hide()
      hide = message.loading('Aguarde, realizando processo de autenticação..')

      await signIn({ email, password })
      message.success('Autenticação realizada com sucesso!')
    } catch {
      message.error('Não foi possível criar sua conta, tente novamente.')
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
          prefix: <UserOutlined className={'prefixIcon'} />,
          autoComplete: 'name',
        }}
        name="name"
        placeholder={'Nome completo'}
        rules={[
          {
            required: true,
            message: 'Insira seu nome completo',
          },
        ]}
      />
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
          autoComplete: 'new-password',
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
