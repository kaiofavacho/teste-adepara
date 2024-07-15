import { Animal } from "./animal";

export interface GTA {
    id: string;
    number: string;
    issuanceDate: Date;
    animals: Animal[];
}
