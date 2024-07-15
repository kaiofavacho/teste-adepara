import { Animal } from "./animal";

export interface ArrivalConfirmation {
    id: string;
    gtaId: string;
    confirmedAnimals: Animal[];
}
