import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@remote/apply'
import { APPLY_STATUS } from '@models/apply'
import useUser from '@hooks/auth/useUser'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import { useAlertContext } from '@contexts/AlertContext'
import FullPagerLoader from '@/components/shared/FullPagerLoader'

export default function ApplyPage() {
  const { open } = useAlertContext()
  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }

  const navigate = useNavigate()

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATUS.COMPLELE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
        }
        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLELE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (data != null && data.status === APPLY_STATUS.COMPLELE) {
    return null
  }

  if (readyToPoll || isLoading) {
    return <FullPagerLoader message="카드를 신청중입니다" />
  }

  return (
    <div>
      <Apply onSubmit={mutate} />
    </div>
  )
}
