import { Button, Result } from 'antd'

import { Wrapper } from './styles'

interface ErrorProps {
  description?: string
  onReset?: () => void
}

export const Failed = ({ description, onReset }: ErrorProps) => (
  <Wrapper>
    <Result
      extra={[
        <Button key="redo" onClick={onReset} type="primary">
          Tentar novamente
        </Button>,
      ]}
      status="error"
      subTitle={description}
      title="Falha ao processar QR Code"
    />
  </Wrapper>
)
