import { ApplyValues } from '@/models/apply'
import { css } from '@emotion/react'
import React, { MouseEvent, useCallback, useState } from 'react'
import Button from '../shared/Button'
import FixedBottomButton from '../shared/FixedBottomButton'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'

type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>

export default function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isHipass: false,
    isMaster: false,
    isRf: false,
  })

  const { isHipass, isMaster, isRf } = cardInfoValues

  const handlebuttonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement

    /*     console.log($button.dataset)
    console.log($button.name) */
    setCardInfoValues((prev) => ({
      ...prev,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  console.log('cardInfoValues', cardInfoValues)
  return (
    <Flex direction="column" css={cardInfoContainerStyles}>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          weak={isMaster === false}
          size="medium"
          data-value={true}
          onClick={handlebuttonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster === true}
          size="medium"
          data-value={false}
          onClick={handlebuttonClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf === true}
          size="medium"
          data-value={false}
          onClick={handlebuttonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={isRf === false}
          size="medium"
          data-value={true}
          onClick={handlebuttonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          weak={isHipass === true}
          size="medium"
          data-value={false}
          onClick={handlebuttonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={isHipass === false}
          size="medium"
          data-value={true}
          onClick={handlebuttonClick}
        >
          신청
        </Button>
      </Button.Group>
      <FixedBottomButton label="다음" onClick={() => onNext(cardInfoValues)} />
    </Flex>
  )
}

const cardInfoContainerStyles = css`
  padding: 24px;
  gap: 10px 0;
`
