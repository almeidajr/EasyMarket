import { useQuery } from 'react-query'

import { fmt } from '../utils/fmt'
import { httpClient } from '../utils/httpClient'

interface Nfce {
  id: string
  amount: string
  emissionDate: string
  issuer: Issuer
  purchases: Purchase[]
}

interface Issuer {
  name: string
}

interface Purchase {
  id: string
  description: string
  quantity: string
  unit: string
  totalPrice: string
}

interface NfceRelevant {
  id: string
  amount: string
  emissionDate: string
  issuerName: string
}

export const useNfces = () =>
  useQuery<NfceRelevant[]>('nfces', async () => {
    const { data } = await httpClient.get<Nfce[]>('/nfces')

    return data
      .sort(
        (a, b) =>
          new Date(b.emissionDate).getTime() -
          new Date(a.emissionDate).getTime(),
      )
      .map(({ id, amount, emissionDate, issuer }) => ({
        id,
        amount: fmt.currency(amount),
        emissionDate: fmt.date(emissionDate),
        issuerName: issuer.name.toLocaleUpperCase(),
      }))
  })

interface NfceDescriptions {
  issuerName: string
  emissionDate: string
  amount: string
  numberOfPurchases: number
  purchases: PurchaseDescriptions[]
}

interface PurchaseDescriptions {
  key: string
  description: string
  quantity: string
  totalPrice: string
  sortPrice: number
}

export const useNfce = (id: string) =>
  useQuery<NfceDescriptions>(
    ['nfce', id],
    async () => {
      const { data } = await httpClient.get<Nfce>(`/nfces/${id}`)

      const details: NfceDescriptions = {
        issuerName: data.issuer.name,
        emissionDate: fmt.date(data.emissionDate),
        amount: fmt.currency(data.amount),
        numberOfPurchases: data.purchases.length,
        purchases: data.purchases
          .sort((a, b) => a.description.localeCompare(b.description))
          .map(({ id, description, quantity, unit, totalPrice }) => ({
            key: id,
            description,
            quantity: `${quantity} ${unit}`,
            totalPrice: fmt.currency(totalPrice),
            sortPrice: Number(totalPrice),
          })),
      }

      return details
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  )
