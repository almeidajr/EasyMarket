import { Spin } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '../components/Layout'
import { useAuth } from '../hooks/useAuth'
import { Dashboard } from './Dashboard'
import { NotFound } from './NotFound'
import { paths } from './paths'
import { PrivateRoute } from './PrivateRoute'
import { Profile } from './Profile'
import { PublicRoute } from './PublicRoute'
import { PurchasesDetails } from './PurchaseDetails'
import { PurchasesHistoric } from './PurchasesHistoric'
import { ShoppingLists } from './ShoppingLists'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'
import { Center } from './styles'

export const Router = () => {
  const { isReady } = useAuth()

  if (!isReady) {
    return (
      <Center>
        <Spin size="large" />
      </Center>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
            index
          />
          <Route
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
            path={paths.signUp}
          />
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
            path={paths.dashboard}
          />
          <Route
            element={
              <PrivateRoute>
                <PurchasesHistoric />
              </PrivateRoute>
            }
            path={paths.purchasesHistoric}
          />
          <Route
            element={
              <PrivateRoute>
                <PurchasesDetails />
              </PrivateRoute>
            }
            path={paths.purchaseDetails}
          />
          <Route
            element={
              <PrivateRoute>
                <ShoppingLists />
              </PrivateRoute>
            }
            path={paths.shoppingLists}
          />
          <Route
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
            path={paths.profile}
          />
          <Route element={<NotFound />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
