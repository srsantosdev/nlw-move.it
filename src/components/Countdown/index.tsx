import React, { useMemo } from 'react';
import { useCountdown } from '../../hooks';

import styles from '../../styles/components/Countdown.module.css';

const Countdown: React.FC = () => {
  const { 
    minutes, 
    seconds, 
    hasFinish, 
    isActive, 
    resetCountdown, 
    startCountdown 
  } = useCountdown()

  const [minuteLeft, minuteRight] = useMemo(() => {
    return String(minutes).padStart(2, '0').split('')
  }, [minutes])

  const [secondLeft, secondRight] = useMemo(() => {
    return String(seconds).padStart(2, '0').split('')
  }, [seconds])

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinish ? (
        <button
          type="button"
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
          <>
            {isActive ? (
              <button
                type="button"
                className={[
                  styles.countdownButton,
                  styles.countdownButtonActive
                ].join(' ')}
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
            ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar um ciclo
                </button>
              )}
          </>
        )}
    </>
  )
}

export default Countdown;