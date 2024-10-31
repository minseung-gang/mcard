import { Card } from '@/models/card'
import { getAdBanners } from '@/remote/adBanner'
import { getCard, getCards } from '@/remote/card'
import { QuerySnapshot } from 'firebase/firestore'

export const querykeys = {
  card: ['card'] as const,
  banner: ['banner'] as const,
}
export const queryOptions = {
  banners: () => ({
    queryKey: querykeys.banner,
    queryFn: async () => await getAdBanners(),
  }),
  cards: () => ({
    queryKey: querykeys.card,
    queryFn: async ({ pageParam }: { pageParam?: QuerySnapshot<Card> }) => {
      return getCards(pageParam)
    },
    getNextPageParam: (snapshot: any) => {
      return snapshot.lastVisible
    },
    suspense: true,
  }),
  card: (id: string) => ({
    querykeys: ['card', id],
    queryFn: async () => await getCard(id),
    enabled: id !== '',
  }),
}
