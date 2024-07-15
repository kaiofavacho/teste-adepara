import { GTA } from '@/models/GTA';
import { Earring } from '@/models/earring';
import Constants from 'expo-constants';
import BaseService, { RequestConfig } from './common/baseService';
import { Animal } from '@/models/animal';
const mockAnimals: Animal[] = [
    { id: '1', identification: 'Animal 1', earringNumber: '076000112346', applicationDate: new Date(), name: 'Animal 1', sex: 'Macho', birthDate: new Date(), weight: 100, size: 'Grande', category: 'Categoria 1', breed: 'Raça 1' },
    { id: '2', identification: 'Animal 2', earringNumber: '076000112347', applicationDate: new Date(), name: 'Animal 2', sex: 'Fêmea', birthDate: new Date(), weight: 105, size: 'Médio', category: 'Categoria 2', breed: 'Raça 2' },
    { id: '3', identification: 'Animal 3', earringNumber: '076000112348', applicationDate: new Date(), name: 'Animal 3', sex: 'Macho', birthDate: new Date(), weight: 110, size: 'Pequeno', category: 'Categoria 3', breed: 'Raça 3' },
    { id: '4', identification: 'Animal 4', earringNumber: '076000112349', applicationDate: new Date(), name: 'Animal 4', sex: 'Fêmea', birthDate: new Date(), weight: 115, size: 'Grande', category: 'Categoria 4', breed: 'Raça 4' },
    { id: '5', identification: 'Animal 5', earringNumber: '076000112350', applicationDate: new Date(), name: 'Animal 5', sex: 'Macho', birthDate: new Date(), weight: 120, size: 'Médio', category: 'Categoria 5', breed: 'Raça 5' },
    { id: '6', identification: 'Animal 6', earringNumber: '076000112351', applicationDate: new Date(), name: 'Animal 6', sex: 'Fêmea', birthDate: new Date(), weight: 125, size: 'Pequeno', category: 'Categoria 6', breed: 'Raça 6' },
    { id: '7', identification: 'Animal 7', earringNumber: '076000112352', applicationDate: new Date(), name: 'Animal 7', sex: 'Macho', birthDate: new Date(), weight: 130, size: 'Grande', category: 'Categoria 7', breed: 'Raça 7' },
    { id: '8', identification: 'Animal 8', earringNumber: '076000112353', applicationDate: new Date(), name: 'Animal 8', sex: 'Fêmea', birthDate: new Date(), weight: 135, size: 'Médio', category: 'Categoria 8', breed: 'Raça 8' },
    { id: '9', identification: 'Animal 9', earringNumber: '076000112354', applicationDate: new Date(), name: 'Animal 9', sex: 'Macho', birthDate: new Date(), weight: 140, size: 'Pequeno', category: 'Categoria 9', breed: 'Raça 9' },
    { id: '10', identification: 'Animal 10', earringNumber: '076000112355', applicationDate: new Date(), name: 'Animal 10', sex: 'Fêmea', birthDate: new Date(), weight: 145, size: 'Grande', category: 'Categoria 10', breed: 'Raça 10' },
    { id: '11', identification: 'Animal 11', earringNumber: '076000112356', applicationDate: new Date(), name: 'Animal 11', sex: 'Macho', birthDate: new Date(), weight: 150, size: 'Médio', category: 'Categoria 11', breed: 'Raça 11' },
    { id: '12', identification: 'Animal 12', earringNumber: '076000112357', applicationDate: new Date(), name: 'Animal 12', sex: 'Fêmea', birthDate: new Date(), weight: 155, size: 'Pequeno', category: 'Categoria 12', breed: 'Raça 12' },
    { id: '13', identification: 'Animal 13', earringNumber: '076000112358', applicationDate: new Date(), name: 'Animal 13', sex: 'Macho', birthDate: new Date(), weight: 160, size: 'Grande', category: 'Categoria 13', breed: 'Raça 13' },
    { id: '14', identification: 'Animal 14', earringNumber: '076000112359', applicationDate: new Date(), name: 'Animal 14', sex: 'Fêmea', birthDate: new Date(), weight: 165, size: 'Médio', category: 'Categoria 14', breed: 'Raça 14' },
    { id: '15', identification: 'Animal 15', earringNumber: '076000112360', applicationDate: new Date(), name: 'Animal 15', sex: 'Macho', birthDate: new Date(), weight: 170, size: 'Pequeno', category: 'Categoria 15', breed: 'Raça 15' },
    { id: '16', identification: 'Animal 16', earringNumber: '076000112361', applicationDate: new Date(), name: 'Animal 16', sex: 'Fêmea', birthDate: new Date(), weight: 175, size: 'Grande', category: 'Categoria 16', breed: 'Raça 16' },
    { id: '17', identification: 'Animal 17', earringNumber: '076000112362', applicationDate: new Date(), name: 'Animal 17', sex: 'Macho', birthDate: new Date(), weight: 180, size: 'Médio', category: 'Categoria 17', breed: 'Raça 17' },
    { id: '18', identification: 'Animal 18', earringNumber: '076000112363', applicationDate: new Date(), name: 'Animal 18', sex: 'Fêmea', birthDate: new Date(), weight: 185, size: 'Pequeno', category: 'Categoria 18', breed: 'Raça 18' },
    { id: '19', identification: 'Animal 19', earringNumber: '076000112364', applicationDate: new Date(), name: 'Animal 19', sex: 'Macho', birthDate: new Date(), weight: 190, size: 'Grande', category: 'Categoria 19', breed: 'Raça 19' },
    { id: '20', identification: 'Animal 20', earringNumber: '076000112365', applicationDate: new Date(), name: 'Animal 20', sex: 'Fêmea', birthDate: new Date(), weight: 195, size: 'Médio', category: 'Categoria 20', breed: 'Raça 20' },
    { id: '21', identification: 'Animal 21', earringNumber: '076000112366', applicationDate: new Date(), name: 'Animal 21', sex: 'Macho', birthDate: new Date(), weight: 200, size: 'Pequeno', category: 'Categoria 21', breed: 'Raça 21' },
];

const mockGtas: GTA[] = [
    { id: '1', number: 'GTA001', issuanceDate: new Date(), animals: mockAnimals },
    { id: '2', number: 'GTA002', issuanceDate: new Date(), animals: [] },
    { id: '3', number: 'GTA003', issuanceDate: new Date(), animals: [] },
];
class GTAService extends BaseService {
    async confirmArrival(gtaId: string, animals: Animal[]): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Confirmed arrival for GTA ${gtaId}:`, animals);
                resolve();
            }, 1000); // Simulating network delay
        });
    }

    getGtas(): Promise<GTA[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockGtas);
            }, 1000); // Simulating network delay
        });
    }
    private apiBaseURL(resource: string): string {
        return `${Constants.expoConfig?.extra?.apiBaseURL}${resource}`;
    }

    async issueGTA(gta: GTA): Promise<void> {
        const config: RequestConfig = {
            method: 'post',
            url: this.apiBaseURL('/gta/issue'),
            data: gta,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await this.request(config);
    }

    async getAnimalsByGtaId(gtaId: string): Promise<Animal[]> {
        const gta = mockGtas.find(gta => gta.id === gtaId);

        return gta ? gta.animals : [];
    }


    async linkEarrings(gtaId: string, earrings: Earring[]): Promise<void> {
        const config: RequestConfig = {
            method: 'post',
            url: this.apiBaseURL(`/gta/${gtaId}/linkEarrings`),
            data: { earrings },
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await this.request(config);
    }
}

// Export an instance of GTAService
export default new GTAService();
