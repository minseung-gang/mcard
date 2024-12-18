import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import Terms from '@/components/apply/Terms'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import React, { useEffect, useState, startTransition } from 'react'
import useUser from '@/hooks/auth/useUser'
import { useParams } from 'react-router-dom'

export default function Apply({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) {
  const user = useUser()
  const { id } = useParams() as { id: string }

  const storageKey = `applied-${user?.uid}-${id}`

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    if (applied === null) {
      return { userId: user?.uid, cardId: id, step: 0 }
    }

    return JSON.parse(applied)
  })

  useEffect(() => {
    startTransition(() => {
      if (applyValues.step === 3) {
        localStorage.removeItem(storageKey)
        onSubmit({
          ...applyValues,
          appliedAt: new Date(),
          status: APPLY_STATUS.READY,
        } as ApplyValues)
      } else {
        localStorage.setItem(storageKey, JSON.stringify(applyValues))
      }
    })
  }, [applyValues, onSubmit, storageKey])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
      step: (prev.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'payDate' | 'creditScore'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...infoValues,
      step: (prev.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...cardInfoValues,
      step: (prev.step as number) + 1,
    }))
  }

  return (
    <div>
      {applyValues.step === 0 && <Terms onNext={handleTermsChange} />}
      {applyValues.step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {applyValues.step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}
