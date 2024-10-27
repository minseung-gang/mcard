export interface AlertProps {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick: () => void
}

export type AlertOptions = Omit<AlertProps, 'open'>
