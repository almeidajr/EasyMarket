import { Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Paragraph } = Typography

export const SubTitle = () => (
  <Space direction="vertical">
    <Paragraph type="secondary">Crie sua conta</Paragraph>
    <Paragraph type="secondary">
      Já é um usuário cadastrado? <Link to="/">Entrar</Link>
    </Paragraph>
  </Space>
)
