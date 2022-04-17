
export interface BlockAnimal {
    prevhash: string;
    owner: string;
    image: string;
    description: string;
    location: {
        lat: number;
        lon: number;
    }
    name: string;
    species: string;
    rase: string;
    characteristics: string[];
    dateLost: string;
    dateAnunt: string;
}