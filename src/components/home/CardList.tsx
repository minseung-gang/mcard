import { useFetchCardList } from '@/service/query/useCardService'
import { flatten } from 'lodash'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Badge from '../shared/Badge'
import ListRow from '../shared/ListRow'

export default function CardList() {
  const {
    data,
    fetchNextPage,
    hasNextPage = false,
    isFetching,
  } = useFetchCardList()
  const navigate = useNavigate()
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null || data == undefined) {
    return null
  }
  const cards = flatten(data?.pages.map(({ items }) => items))

  return (
    <div style={{ minHeight: '90vh', boxSizing: 'border-box' }}>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map(({ name, payback, id }, idx) => {
            return (
              <ListRow
                key={id}
                contents={
                  <ListRow.Texts title={`${idx + 1}위`} subTitle={name} />
                }
                right={payback != null && <Badge label={payback} />}
                withArrow
                onClick={() => {
                  navigate(`/card/${id}`)
                }}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
