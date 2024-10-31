import React from 'react'
import Flex from './Flex'
import { IoIosArrowForward } from 'react-icons/io'
import { css } from '@emotion/react'
import Text from './Text'

interface ListRowProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
}

export default function ListRow({
  left,
  contents,
  right,
  withArrow,
  onClick,
}: ListRowProps) {
  return (
    <Flex as="li" css={listRowContainer} onClick={onClick} align="center">
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IoIosArrowForward /> : null}
    </Flex>
  )
}

const listRowContainer = css`
  padding: 8px 24px;
`
const listRowLeftStyles = css`
  margin-right: 14px;
`
const listRowContentsStyles = css`
  flex: 1;
`

function ListRowTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
}) {
  return (
    <Flex direction="column">
      <Text bold={true} style={{ marginBottom: '2px' }}>
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

ListRow.Texts = ListRowTexts
