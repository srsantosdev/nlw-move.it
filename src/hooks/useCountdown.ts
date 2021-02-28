import { useContext } from 'react'

import { CountdownContextData, CountdownContext } from '../providers/countdown'

export function useCountdown(): CountdownContextData {
  const context = useContext(CountdownContext)

  return context
}