import { FileSearchOutlined, HistoryOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import { Breadcrumb } from 'antd'
import { Link, useParams } from 'react-router-dom'

import { NfceDetails } from '../../components/NfceDetails'
import { paths } from '../paths'

const { Item } = Breadcrumb

export const PurchasesDetails = () => {
  const { id } = useParams<'id'>()

  return (
    <PageContainer
      breadcrumbRender={() => (
        <Breadcrumb>
          <Item>
            <HistoryOutlined />
            <Link to={paths.purchasesHistoric}>Histórico de compras</Link>
          </Item>
          <Item>
            <FileSearchOutlined />
            <span>Detalhes da compra</span>
          </Item>
        </Breadcrumb>
      )}
    >
      <NfceDetails id={id!} />
    </PageContainer>
  )
}
