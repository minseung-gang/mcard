import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'

export default function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false
  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {showSignButton && (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )}
    </Flex>
  )
}

const navbarContainerStyles = css`
  height: 55px;
  padding: 10px 24px;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`
