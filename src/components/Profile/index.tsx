import React from 'react';
import { useChallenges } from '../../hooks';

import styles from '../../styles/components/Profile.module.css';

const Profile: React.FC = () => {
  const { level } = useChallenges()

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/srsantosdev.png" alt="Samuel Ramos" />
      <div>
        <strong>Samuel Ramos</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile;