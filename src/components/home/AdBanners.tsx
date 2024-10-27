import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { colors } from '@/styles/colorPalette'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import { useFetchBannerList } from '@/service/query/useCardService'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function AdBanners() {
  const { data: banners } = useFetchBannerList()

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {banners?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to="/">
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold>{banner.title}</Text>
                  <Text typography="t7" style={{ marginTop: 2 }}>
                    {banner.description}
                  </Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`
