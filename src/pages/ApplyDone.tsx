import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { parse } from 'qs'
import React from 'react'

export default function ApplyDone() {
  const { success } = parse(window.location.search, { ignoreQueryPrefix: true })

  return (
    <Flex>
      <Text>
        {success === 'true'
          ? '카드가 발급되었습니다.'
          : '카드 발급에 실패했습니다'}
      </Text>
      <FixedBottomButton label="확인" onClick={() => window.history.back()} />
    </Flex>
  )
}
