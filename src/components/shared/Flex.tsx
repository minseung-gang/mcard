import { CSSProperties } from 'react'
import styled from '@emotion/styled'

interface FlexProps {
  align?: CSSProperties['alignItems']
  justfiy?: CSSProperties['justifyContent']
  direction?: CSSProperties['flexDirection']
}

const Flex = styled.div<FlexProps>(({ align, justfiy, direction }) => ({
  display: 'flex',
  alignItems: align,
  justifyContent: justfiy,
  flexDirection: direction,
}))

export default Flex
