import Alert from '@/components/shared/Alert'
import { createContext, useCallback, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertOptions, AlertProps } from '@/models/alert'

interface AlertContextValue {
  open: (options: AlertOptions) => void
}

export const Context = createContext<AlertContextValue | undefined>(undefined)

const defaultValues: AlertProps = {
  open: false,
  title: null,
  description: null,
  onButtonClick: () => {},
}

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [alertState, setAlertState] = useState(defaultValues)
  const $portal_root = document.getElementById('root-portal') as Element

  const close = useCallback(() => {
    setAlertState(defaultValues)
  }, [])

  const open = useCallback(
    ({ onButtonClick, ...options }: AlertOptions) => {
      setAlertState({
        ...options,
        onButtonClick: () => {
          close()
          onButtonClick()
        },
        open: true,
      })
    },
    [close],
  )

  const values = useMemo(() => ({ open }), [open])

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root && createPortal(<Alert {...alertState} />, $portal_root)}
    </Context.Provider>
  )
}