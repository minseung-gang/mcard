import {
  ButtonColor,
  buttonColorMap,
  ButtonSIze,
  buttonSizeMap,
  buttonWeakMap,
} from '@/styles/button'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

interface ButtonProps {
  color?: ButtonColor
  size?: ButtonSIze
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

const BaseButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.26;
          cursor: initial;
        `
      : undefined,
)

function ButtonGroup({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <Flex direction="column">
      {title && <Text>{title}</Text>}
      <Spacing size={8} />
      <Flex css={ButtonGroupStyles}>{children}</Flex>
    </Flex>
  )
}

const ButtonGroupStyles = css`
  flex-wrap: wrap;
  gap: 10px;

  & button {
    flex: 1;
  }
`
const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup
}

Button.Group = ButtonGroup

export default Button
