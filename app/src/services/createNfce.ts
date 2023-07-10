import { scraperClient } from '../utils/httpClient'

interface Nfce {
  id: string
}

export const createNfce = async (url: string): Promise<Nfce> => {
  const { data } = await scraperClient.post<Nfce>('/', { url })
  return data
}
