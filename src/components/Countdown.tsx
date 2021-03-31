import { useContext, useMemo } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const {    
        CONVERTED_MINUTES, 
        time,        
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown 
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = useMemo(() => String(minutes).padStart(2, '0').split(''), [time]);
    const [secondLeft, secondRight] = useMemo(() => String(seconds).padStart(2, '0').split(''), [time]);

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
                            <div style={{ width: `${100-(time*100)/CONVERTED_MINUTES}%`}} />
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