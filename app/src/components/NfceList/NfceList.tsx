import { Alert, Card, Col, Row, Typography } from 'antd'
import { Gutter } from 'antd/lib/grid/row'
import { Link } from 'react-router-dom'

import { useNfces } from '../../hooks/useFetch'
import { Center } from './styles'

const { Paragraph, Title } = Typography

const lineSize = 24
const cardsGutter: [Gutter, Gutter] = [
  { xs: 12, sm: 24, md: 36, lg: 28 },
  { xs: 8, sm: 16, md: 24, lg: 32 },
]
const cardsSpan = {
  xs: { span: lineSize / 1 },
  sm: { span: lineSize / 1 },
  md: { span: lineSize / 2 },
  lg: { span: lineSize / 2 },
  xl: { span: lineSize / 2 },
  xll: { span: lineSize / 3 },
}
const skeletons = Array.from(Array(4).keys())

export const NfceList = () => {
  const { data, isLoading, isError } = useNfces()

  if (isLoading) {
    return (
      <Row gutter={cardsGutter}>
        {skeletons.map((i) => (
          <Col className="gutter-row" key={i} {...cardsSpan}>
            <Card loading />
          </Col>
        ))}
      </Row>
    )
  }

  if (isError) {
    return (
      <Alert
        description="Falha na aquisição dos dados, aguarde alguns instantes e atualize a página."
        message="Erro na conexão"
        showIcon
        type="error"
      />
    )
  }

  if (!data || data.length === 0) {
    return (
      <Alert
        description="Comece com a leitura do QR Code presente em cupons fiscais."
        message="Nenhum registro encontrado"
        showIcon
        type="info"
      />
    )
  }

  return (
    <Row gutter={cardsGutter}>
      {data.map((nfce) => (
        <Col className="gutter-row" key={nfce.id} {...cardsSpan}>
          <Link to={nfce.id}>
            <Card
              headStyle={{
                textAlign: 'center',
              }}
              hoverable
              title={nfce.issuerName}
            >
              <Center>
                <Title level={3}>{nfce.amount}</Title>
                <Paragraph type="secondary">{nfce.emissionDate}</Paragraph>
              </Center>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  )
}
