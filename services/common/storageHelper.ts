// storageHelper.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredRequests = async () => {
    try {
        const storedValue = await AsyncStorage.getItem('localRequests');
        return storedValue ? JSON.parse(storedValue) : [];
    } catch (error) {
        console.error('Failed to load local requests from storage', error);
        return [];
    }
};

export const saveStoredRequests = async (requests: any[]) => {
    try {
        await AsyncStorage.setItem('localRequests', JSON.stringify(requests));
    } catch (error) {
        console.error('Failed to save requests to storage', error);
    }
};
