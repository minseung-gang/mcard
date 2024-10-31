import { Context } from '@/contexts/AlertContext'
import { useContext } from 'react'

export function useAlertContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('AlertContext 내부에서 사용해주세요')
  }

  return values
}
