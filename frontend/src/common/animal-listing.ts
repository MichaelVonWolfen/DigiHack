
export type AnimalListing = LostAnimalListing | FoundAnimalListing;

export type CommonAnimalListingTraits = {
    hash?: string;
    prevHash: string;
    species: string;
    type: 'lost' | 'found';
    createdAt: Date;
    location: GeoCoordinates;
    imageUrl: string;
    solved: boolean;
}

export type LostAnimalListing = CommonAnimalListingTraits & {
    owner: string;
    type: 'lost';
    lostAt: Date;
    dangeros: boolean;
    name?: string;
    race?: string;
    note?: string;
};

export type FoundAnimalListing = CommonAnimalListingTraits & {
    finder: string;
    type: 'found';
    foundAt: Date;
    onlySeen: boolean;
    race?: string;
    note?: string;
};

export type GeoCoordinates = {
    lat: number;
    lng: number;
}