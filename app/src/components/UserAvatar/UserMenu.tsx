import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { paths } from '../../routes/paths'

export const UserMenu = () => {
  const [isDisplayed, { setFalse }] = useBoolean(true)
  const { signOut } = useAuth()

  return (
    <Menu hidden={!isDisplayed} onClick={setFalse} theme="dark">
      <Menu.Item icon={<ProfileOutlined />} key={1}>
        <Link to={paths.profile}>Perfil do usuário</Link>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} key={2} onClick={signOut}>
        Sair
      </Menu.Item>
    </Menu>
  )
}
