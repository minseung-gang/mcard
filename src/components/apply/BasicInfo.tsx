import React, { ChangeEvent, useCallback, useState } from 'react'
import { Select } from '../shared/Select'
import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply'
import { ApplyValues } from '@/models/apply'
import FixedBottomButton from '../shared/FixedBottomButton'
import { css } from '@emotion/react'
import Flex from '../shared/Flex'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

export default function BasicInfo({
  onNext,
}: {
  onNext: (infoValues: InfoValues) => void
}) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })
  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const 모든정보가선택되었는가 = Object.values(infoValues).every(
    (value) => value,
  )
  console.log(모든정보가선택되었는가)
  return (
    <Flex direction="column" css={infoContainerStyles}>
      <Select
        name="salary"
        label="연소득"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        onClick={() => onNext(infoValues)}
        disabled={모든정보가선택되었는가 === false}
      />
    </Flex>
  )
}

const infoContainerStyles = css`
  padding: 24px;
  gap: 20px 0;
`
