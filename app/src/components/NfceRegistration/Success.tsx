import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

import { Wrapper } from './styles'

interface SuccessProps {
  id: string
  onReset?: () => void
}

export const Success = ({ id, onReset }: SuccessProps) => (
  <Wrapper>
    <Result
      extra={[
        <Link key="details" to={id}>
          <Button type="primary">Ver Detalhes</Button>
        </Link>,
        <Button key="new" onClick={onReset}>
          Nova Leitura
        </Button>,
      ]}
      status="success"
      title="Dados processados com sucesso!"
    />
  </Wrapper>
)
