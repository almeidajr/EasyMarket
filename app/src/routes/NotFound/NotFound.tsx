import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { paths } from '../paths'

export const NotFound = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Result
      extra={
        <Link to={isAuthenticated ? paths.purchasesHistoric : paths.signIn}>
          <Button type="primary">Voltar para a página inicial</Button>
        </Link>
      }
      status="404"
      style={{ padding: 0 }}
      subTitle="A página que você está procurando não existe"
      title="404"
    />
  )
}
