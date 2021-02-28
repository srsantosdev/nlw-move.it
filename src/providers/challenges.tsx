import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
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
  completeChallenge: () => void;
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

    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }, [])

  const resetChallenge = useCallback(() => setActiveChallenge(null), [])

  const completeChallenge = useCallback(() => {
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(state => state + 1)
  }, [activeChallenge, currentExperience, experienceToNextLevel])

  useEffect(() => {
    Notification.requestPermission();
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
      completeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}