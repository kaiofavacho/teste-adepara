import React, { createContext, useState, useEffect, ReactNode } from 'react';
import logger from '@/utils/logger';

interface LogContextProps {
    logs: string[];
    updateLogs: () => void;
}

export const LogContext = createContext<LogContextProps | undefined>(undefined);

export const LogProvider = ({ children }: { children: ReactNode }) => {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const logInterval = setInterval(() => {
            const rawLogs = logger.getLogs();
            const formattedLogs = rawLogs.map(log => formatLog(log));
            setLogs(formattedLogs);
        }, 1000);

        return () => {
            clearInterval(logInterval);
        };
    }, []);

    const formatLog = (log: any): string => {
        if (typeof log === 'object') {
            try {
                return JSON.stringify(log, null, 2);
            } catch (error) {
                return `Error converting log to JSON string: ${error}`;
            }
        }
        return log.toString();
    };

    const updateLogs = () => {
        const rawLogs = logger.getLogs();
        const formattedLogs = rawLogs.map(log => formatLog(log));
        setLogs(formattedLogs);
    };

    return (
        <LogContext.Provider value={{ logs, updateLogs }}>
            {children}
        </LogContext.Provider>
    );
};
