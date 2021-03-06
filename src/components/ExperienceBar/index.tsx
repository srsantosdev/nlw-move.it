import React from 'react';
import { useChallenges } from '../../hooks';

import styles from '../../styles/components/ExperienceBar.module.css';

const ExperienceBar: React.FC = () => {
  const { currentExperience, experienceToNextLevel } = useChallenges()

  const percentToNextLevel = Math.round((currentExperience * 100)) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience}xp
        </span>
      </div>
      <span>{experienceToNextLevel}xp</span>
    </header>
  )
}

export default ExperienceBar;