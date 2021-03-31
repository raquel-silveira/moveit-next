import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

const CONVERTED_MINUTES = 0.1 * 60;

interface CountdownContextData {
    CONVERTED_MINUTES: number,
    time: number,
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountdown: () => void,
    resetCountdown: () => void
}

interface CountdowProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdowProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(CONVERTED_MINUTES);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = useMemo(() => Math.floor(time / 60), [time]);
    const seconds = useMemo(() => time % 60, [time]);

    const startCountdown = useCallback(() => {
        setIsActive(true); 
    }, [isActive]);

    const resetCountdown = useCallback(() => {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(CONVERTED_MINUTES);
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
        <CountdownContext.Provider value={{
            CONVERTED_MINUTES,
            time,
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}