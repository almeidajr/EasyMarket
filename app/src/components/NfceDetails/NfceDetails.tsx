import ProDescriptions from '@ant-design/pro-descriptions'
import { Alert, Skeleton, Table } from 'antd'

import { useNfce } from '../../hooks/useFetch'

interface NfceDetailsProps {
  id: string
}

const { Item } = ProDescriptions

export const NfceDetails = ({ id }: NfceDetailsProps) => {
  const { data, isLoading, isError } = useNfce(id)

  if (isLoading) {
    return (
      <>
        <Skeleton />
        <Table loading />
      </>
    )
  }

  if (isError || !data) {
    return (
      <Alert
        description="Falha na aquisição dos dados, aguarde alguns instantes e atualize a página."
        message="Erro na conexão"
        showIcon
        type="error"
      />
    )
  }

  return (
    <>
      <ProDescriptions title={data.issuerName}>
        <Item label="Data da compra">{data.emissionDate}</Item>
        <Item label="Valor pago">{data.amount}</Item>
        <Item label="Quantidade de itens">{data.numberOfPurchases}</Item>
      </ProDescriptions>
      <Table
        columns={[
          {
            title: 'Produto',
            dataIndex: 'description',
            key: 'description',
            defaultSortOrder: 'ascend',
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => a.description.localeCompare(b.description),
          },
          {
            title: 'Quantidade',
            dataIndex: 'quantity',
            key: 'quantity',
            responsive: ['md'],
            align: 'right',
          },
          {
            title: 'Valor',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'right',
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => a.sortPrice - b.sortPrice,
          },
        ]}
        dataSource={data.purchases}
        locale={{
          triggerAsc: 'Ordenar em ordem crescendente',
          triggerDesc: 'Ordenar em ordem decrescente',
          cancelSort: 'Remover ordenação',
        }}
        pagination={{
          hideOnSinglePage: true,
          position: ['bottomCenter'],
          onChange: () => window.scrollTo(0, 0),
        }}
        size="small"
        tableLayout="auto"
      />
    </>
  )
}
