

export interface BlockAnimal {
    species: string;
}

export interface SearchFormBlockAnimal {
    species: string;
    after: Date;
    type: 'lost' | 'found';
    time_reference: TimeReference;
    location: GeolocationCoordinated;
}

export type TimeReference = { before: Date; } | { after: Date; };

export type GeolocationCoordinated = {
    lat: number;
    lng: number;
}