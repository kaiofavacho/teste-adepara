import { Animal } from '../models/animal';
import Constants from 'expo-constants';
import BaseService, { RequestConfig } from './common/baseService';

class AnimalService extends BaseService {
    private apiBaseURL(resource: string): string {
        return `${Constants.expoConfig?.extra?.apiBaseURL}${resource}`;
    }

    async fetchAnimalData(animalId: string): Promise<Animal> {
        const config: RequestConfig = {
            method: 'get',
            url: this.apiBaseURL(`/animals/${animalId}`),
        };
        return this.request(config);
    }
}

export default new AnimalService();
