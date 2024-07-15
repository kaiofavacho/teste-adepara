import { Animal } from '@/models/animal';
import { GTA } from '@/models/GTA';
import Constants from 'expo-constants';
import BaseService, { RequestConfig } from './common/baseService';

class ConfirmationService extends BaseService {
    private apiBaseURL(resource: string): string {
        return `${Constants.expoConfig?.extra?.apiBaseURL}${resource}`;
    }

    async getGTAs(): Promise<GTA[]> {
        const config: RequestConfig = {
            method: 'get',
            url: this.apiBaseURL('/gta'),
        };
        return this.request(config);
    }

    async confirmArrival(gtaId: string, animals: Animal[]): Promise<void> {
        const config: RequestConfig = {
            method: 'post',
            url: this.apiBaseURL(`/gta/${gtaId}/confirmArrival`),
            data: { animals },
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await this.request(config);
    }
}


export default new ConfirmationService();