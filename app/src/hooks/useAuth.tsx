import { useBoolean, useLocalStorageState } from 'ahooks'
import jwtDecode from 'jwt-decode'
import { createContext, FC, useCallback, useContext, useEffect } from 'react'

import { httpClient, scraperClient } from '../utils/httpClient'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  accessToken: string
}

interface AuthContextData {
  isAuthenticated: boolean
  signIn: (credentials: SignInRequest) => Promise<void>
  signOut: () => void
  isReady: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const key = '@EasyMarket:accessToken'
const getInitialAuth = (): boolean => {
  const token = JSON.parse(localStorage.getItem(key) ?? 'null')
  if (!token) {
    return false
  }
  const { exp } = jwtDecode<{ exp: number }>(token)
  if (isNaN(exp) || exp * 1000 < Date.now()) {
    localStorage.removeItem(key)
    return false
  }

  return true
}

const useProvideAuth = (): AuthContextData => {
  const [isAuthenticated, { setTrue, setFalse }] = useBoolean(getInitialAuth())
  const [accessToken, setAccessToken] = useLocalStorageState<string | null>(
    key,
    { defaultValue: null },
  )
  const [isReady, { setTrue: setReady }] = useBoolean(false)

  const signIn = useCallback(
    async ({ email, password }: SignInRequest) => {
      const { data } = await httpClient.post<SignInResponse>('/auth/login', {
        email,
        password,
      })
      setAccessToken(data.accessToken)
    },
    [setAccessToken],
  )

  const signOut = useCallback(() => setAccessToken(null), [setAccessToken])

  useEffect(() => {
    if (accessToken) {
      httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      scraperClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      setTrue()
    } else {
      delete httpClient.defaults.headers.common.Authorization
      delete scraperClient.defaults.headers.common.Authorization
      setFalse()
    }
    setTimeout(() => setReady(), 100)
  }, [accessToken, setFalse, setReady, setTrue])

  return {
    isAuthenticated,
    signIn,
    signOut,
    isReady,
  }
}

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
