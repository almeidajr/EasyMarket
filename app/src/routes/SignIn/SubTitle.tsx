import { Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Paragraph } = Typography

export const SubTitle = () => (
  <Space direction="vertical">
    <Paragraph type="secondary">Faça login em sua conta</Paragraph>
    <Paragraph type="secondary">
      Não tem uma conta? <Link to="/sign-up">Crie uma!</Link>
    </Paragraph>
  </Space>
)
