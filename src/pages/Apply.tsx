import Apply from '@/components/apply'
import BasicInfo from '@/components/apply/BasicInfo'
import CardInfo from '@/components/apply/CardInfo'
import useApplyCardMutation from '@/components/apply/hooks/useApplyCardMutation'
import Terms from '@/components/apply/Terms'
import { ApplyValues } from '@/models/apply'
import React, { useState } from 'react'

export default function ApplyPage() {
  const { mutate } = useApplyCardMutation({
    onSuccess: () => {},
    onError: () => {},
  })
  const handleSubmit = () => {}
  return (
    <div>
      <Apply onSubmit={handleSubmit} />
    </div>
  )
}
