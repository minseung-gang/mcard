import React, { MouseEvent, useCallback, useState } from 'react'
import Agreement from '../shared/Agreement'
import { 약관목록 } from '@constants/apply'
import FixedBottomButton from '../shared/FixedBottomButton'
import { ApplyValues } from '@/models/apply'
export default function Terms({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void
}) {
  const [termsAgreement, setTermsAgreement] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })
  const checkAll = Object.values(termsAgreement).every((agree) => agree)

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreement((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )
  return (
    <Agreement>
      <Agreement.Title
        checked={checkAll}
        onChange={(e, checked) => handleAllAgreement(e, checked)}
      >
        약관에 모두 동의
      </Agreement.Title>
      {약관목록.map(({ id, title, link }) => (
        <Agreement.Description
          key={id}
          checked={termsAgreement[id]}
          link={link}
          onChange={(_, checked) => {
            setTermsAgreement((prevTerms) => ({
              ...prevTerms,
              [id]: checked,
            }))
          }}
        >
          {title}
        </Agreement.Description>
      ))}
      <FixedBottomButton
        label="약관동의"
        disabled={!checkAll}
        onClick={() => {
          onNext(Object.keys(termsAgreement))
        }}
      />
    </Agreement>
  )
}
