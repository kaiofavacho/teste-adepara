// useStorageState.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorageState = <T>(key: string, initialValue: T): [T, (value: T) => Promise<void>] => {
    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        const loadState = async () => {
            try {
                const storedValue = await AsyncStorage.getItem(key);
                if (storedValue !== null) {
                    setState(JSON.parse(storedValue));
                }
            } catch (error) {
                console.error('Failed to load state from storage', error);
            }
        };

        loadState();
    }, [key]);

    const setStorageState = async (value: T) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            setState(value);
        } catch (error) {
            console.error('Failed to save state to storage', error);
        }
    };

    return [state, setStorageState];
};
