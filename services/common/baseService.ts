import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { getStoredRequests, saveStoredRequests } from './storageHelper';

export interface RequestConfig {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    data?: any;
    headers?: any;
}

export default class BaseService {
    private isConnected: boolean = true;

    constructor() {
        NetInfo.addEventListener(state => {
            const wasConnected = this.isConnected;
            this.isConnected = state.isConnected ?? false;

            // If the device has just reconnected, initiate sync to cloud
            if (!wasConnected && this.isConnected) {
                this.syncToCloud();
            }
        });
    }

    async request(config: RequestConfig): Promise<any> {
        if (this.isConnected) {
            try {
                const response = await axios(config);
                return response.data;
            } catch (error) {
                throw error;
            }
        } else {
            // Save to local storage
            return this.saveToLocal(config);
        }
    }

    private async saveToLocal(config: RequestConfig): Promise<any> {
        const localRequests = await getStoredRequests();
        localRequests.push(config);
        await saveStoredRequests(localRequests);
        return { message: 'Saved locally due to no internet connection' };
    }

    async syncToCloud(): Promise<void> {
        const localRequests = await getStoredRequests();

        for (const config of localRequests) {
            try {
                await axios(config);
            } catch (error) {
                console.error('Failed to sync request:', config, error);
            }
        }

        await saveStoredRequests([]); // Clear local storage after syncing
    }
}
