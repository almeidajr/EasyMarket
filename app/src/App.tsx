import { ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'

import { AuthProvider } from './hooks/useAuth'
import { Router } from './routes'

export const App = () => {
  return (
    <ConfigProvider locale={ptBR}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ConfigProvider>
  )
}
