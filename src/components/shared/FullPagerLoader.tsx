import React from 'react'
import Flex from './Flex'
import Spacing from './Spacing'
import Text from './Text'

export default function FullPagerLoader({ message }: { message?: string }) {
  return (
    <Flex
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
          width={120}
          alt="로딩이미지"
        />
        {message && (
          <>
            <Spacing size={120} />
            <Text bold typography="t4">
              {message}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}
