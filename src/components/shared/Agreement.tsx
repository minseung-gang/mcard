import { css } from '@emotion/react'
import React, { MouseEvent } from 'react'
import Flex from './Flex'
import Text from './Text'
import { IoCheckmark } from 'react-icons/io5'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { colors } from '@/styles/colorPalette'

export default function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyels}>
      {children}
    </Flex>
  )
}

function AgreementTitle({
  children,
  checked = false,
  onChange,
}: {
  children: React.ReactNode
  checked?: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" align="center" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} withCircle />
      <Text bold>{children}</Text>
    </Flex>
  )
}

function AgreementDescription({
  link,
  children,
  checked = false,
  onChange,
}: {
  link?: string
  children: React.ReactNode
  checked?: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" justify="space-between">
      <Flex onClick={(e) => onChange(e, !checked)}>
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link && (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t6">링크</Text>
        </a>
      )}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

function IconCheck({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) {
  return withCircle ? (
    <IoIosCheckmarkCircleOutline
      size={24}
      color={checked ? colors.blue : colors.grey}
      style={{ marginRight: '3px' }}
    />
  ) : (
    <IoCheckmark
      size={24}
      color={checked ? colors.blue : colors.grey}
      style={{ marginRight: '3px' }}
    />
  )
}
const agreementContainerStyels = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`
