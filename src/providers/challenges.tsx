import { createContext, ReactNode, useCallback, useState } from "react";
import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

export interface ChallengesProviderData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesProviderData)


export const ChallengesProvider: React.FC<ChallengeProviderProps> = ({
  children
}) => {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  const levelUp = useCallback(() => {
    setLevel(state => state + 1)
  }, [])

  const startNewChallenge = useCallback(() => {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length)

    const challenge = challenges[randomChallengesIndex]

    setActiveChallenge(challenge)
  }, [])

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null)
  }, [])

  return (
    <ChallengesContext.Provider value={{
      levelUp,
      level,
      currentExperience,
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}