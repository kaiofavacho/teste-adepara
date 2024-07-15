import { Animal } from '../models/animal';
import { Earring } from '@/models/earring';
import Constants from 'expo-constants';
import BaseService, { RequestConfig } from './common/baseService';
const mockEarrings: Earring[] = [
    { id: '1', number: '076000112345', receptionDate: new Date() },
    { id: '2', number: '076000212346', receptionDate: new Date() },
];

const mockAnimals: Animal[] = [
    { id: '1', identification: 'Animal 1', earringNumber: '076000112345', applicationDate: new Date(), name: 'Animal 1', sex: 'Macho', birthDate: new Date(), weight: 100, size: 'Grande', category: 'Categoria 1', breed: 'Raça 1' },
    { id: '2', identification: 'Animal 2', earringNumber: '076000212346', applicationDate: new Date(), name: 'Animal 2', sex: 'Fêmea', birthDate: new Date(), weight: 120, size: 'Médio', category: 'Categoria 2', breed: 'Raça 2' }
];

class EarringService extends BaseService {
    private apiBaseURL(resource: string): string {
        return `${Constants.expoConfig?.extra?.apiBaseURL}${resource}`;
    }

    // async getEarringsReceived(): Promise<Earring[]> {
    //     const config: RequestConfig = {
    //         method: 'get',
    //         url: this.apiBaseURL('/earrings'),
    //     };
    //     return this.request(config);
    // }


    // async confirmReception(earring: Earring[]): Promise<void> {
    //     const config: RequestConfig = {
    //         method: 'post',
    //         url: this.apiBaseURL('/earrings/reception'),
    //         data: earring,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };
    //     await this.request(config);
    // }

    // async confirmApplication(animal: Animal): Promise<void> {
    //     const config: RequestConfig = {
    //         method: 'post',
    //         url: this.apiBaseURL('/earrings/application'),
    //         data: animal,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     };
    //     await this.request(config);
    // }

    async getEarringsReceived(): Promise<Earring[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockEarrings);
            }, 1000); // Simulating network delay
        });
    }

    async confirmReception(earrings: Earring[]): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Confirmed reception of earrings:', earrings);
                resolve();
            }, 1000); // Simulating network delay
        });
    }

    async confirmApplication(animal: Animal): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Confirmed application for animal:', animal);
                resolve();
            }, 1000); // Simulating network delay
        });
    }
}

export default new EarringService();
