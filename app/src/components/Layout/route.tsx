import {
  DashboardOutlined,
  HistoryOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Route } from '@ant-design/pro-layout/lib/typings'

import { paths } from '../../routes/paths'

export const route: Route = {
  routes: [
    {
      path: paths.dashboard,
      name: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      path: paths.purchasesHistoric,
      name: 'Histórico de compras',
      icon: <HistoryOutlined />,
    },
    {
      path: paths.purchaseDetails,
      name: 'Detalhes da compra',
      hideInMenu: true,
    },
    {
      path: paths.shoppingLists,
      name: 'Listas de compras',
      icon: <ShoppingCartOutlined />,
    },
    {
      path: paths.profile,
      name: 'Perfil do usuário',
      hideInMenu: true,
    },
  ],
}
