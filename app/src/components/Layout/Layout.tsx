import ProLayout from '@ant-design/pro-layout'
import { BackTop } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'

import packageJson from '../../../package.json'
import { useAuth } from '../../hooks/useAuth'
import { paths } from '../../routes/paths'
import { UserAvatar } from '../UserAvatar'
import { route } from './route'
import { Container, Version } from './styles'

export const Layout = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  return (
    <Container id="layout-container">
      <ProLayout
        fixSiderbar
        fixedHeader
        headerRender={isAuthenticated ? undefined : false}
        hide={!isAuthenticated}
        location={location}
        menuFooterRender={() => <Version code>v{packageJson.version}</Version>}
        menuItemRender={(item, dom) => (
          <Link to={item.path ?? paths.purchasesHistoric}>{dom}</Link>
        )}
        pageTitleRender={() => 'EasyMarket'}
        rightContentRender={UserAvatar}
        route={route}
        title="EasyMarket"
      >
        <Outlet />
        <BackTop />
      </ProLayout>
    </Container>
  )
}
