import { useInfiniteQuery, useQuery } from 'react-query'
import { queryOptions } from './query'

export function useFetchBannerList() {
  return useQuery(queryOptions.banners())
}

export function useFetchCardList() {
  return useInfiniteQuery(queryOptions.cards())
}

export function useFetchCard(id: string) {
  return useQuery(queryOptions.card(id))
}
