import { css } from '@emotion/react'
import React from 'react'
import Flex from './Flex'
import Text from './Text'

interface TopProps {
  title: string
  subtitle: string
}

export default function Top({ title, subtitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold typography="t4">
        {title}
      </Text>
      <Text typography="t7">{subtitle}</Text>
    </Flex>
  )
}
const containerStyles = css`
  padding: 24px;
`
