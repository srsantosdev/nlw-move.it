import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useChallenges } from "../hooks";

interface CountdownProviderProps {
  children: ReactNode
}

export interface CountdownContextData {
  isActive: boolean;
  hasFinish: boolean;
  minutes: number;
  seconds: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout
const DEFAULT_TIME = 25 * 60

export const CountdownProvider: React.FC<CountdownProviderProps> = ({
  children
}) => {
  const { startNewChallenge } = useChallenges()

  const [time, setTime] = useState(DEFAULT_TIME)
  const [isActive, setIsActive] = useState(false)
  const [hasFinish, setHasFinish] = useState(false)

  const minutes = useMemo(() => Math.floor(time / 60), [time])
  const seconds = useMemo(() => time % 60, [time])

  const startCountdown = useCallback(() => {
    setIsActive(true)
  }, [])

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout)
    setIsActive(false)

    setTime(DEFAULT_TIME)
    setHasFinish(false)
  }, [])

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinish(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      isActive,
      hasFinish,
      minutes,
      seconds,
      startCountdown,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}