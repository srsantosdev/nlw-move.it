import { useContext } from 'react'

import { ChallengesContext, ChallengesProviderData } from '../providers/challenges'

export function useChallenges(): ChallengesProviderData {
  const context = useContext(ChallengesContext)

  return context
}