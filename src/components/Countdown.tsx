import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

const MINUTES = 0.3;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(MINUTES * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = useMemo(() => Math.floor(time / 60), [time]);
    const seconds = useMemo(() => time % 60, [time]);

    const [minuteLeft, minuteRight] = useMemo(() => String(minutes).padStart(2, '0').split(''), [time]);
    const [secondLeft, secondRight] = useMemo(() => String(seconds).padStart(2, '0').split(''), [time]);

    const startCountdown = useCallback(() => {
        setIsActive(!isActive); 
    }, [isActive]);

    const resetCountdown = useCallback(() => {
        clearTimeout(countdownTimeout);
        setIsActive(!isActive); 
        setTime(MINUTES * 60);
    }, [isActive]);

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <div>
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

            { hasFinished ? (
                <button 
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado

                    <div>
                        <div style={{ width: '100%' }} />
                    </div>
                </button>
            ) : (
                isActive ? (
                    <button 
                        type="button" 
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown}
                    >
                        Abandonar ciclo

                        <div>
                            <div style={{ width: `${100-(time*100)/(MINUTES * 60)}%`}} />
                        </div>
                    </button>
                ) : (
                    <button 
                        type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown}
                    >
                        Iniciar um ciclo
                    </button>
                )
            ) }
        </div>
    );
}