import { AnimalListing, AnimalListingWithDistance } from "../common/animal-listing";
import { SearchAnimalFormData } from "../pages/search/search";
import localForage from "localforage";
import haversine from 'haversine-distance';



export const getListing = async (formData: SearchAnimalFormData): Promise<AnimalListingWithDistance[]> => {
    const listingKeys = await localForage.keys();
    const results: AnimalListingWithDistance[] = [];
    for (const key of listingKeys) {
        const listing: AnimalListing | null = await localForage.getItem(key);
        if (listing === null) {
            continue;
        }
        if (filterBySearchData(listing, formData)) {
            results.push({
                ...listing,
                distanceInMeters: formData.location ? haversine(formData.location, listing.location) : null
            });
        }
    }

    return sortBySearchData(results, formData);
}

const filterBySearchData = (listing: AnimalListing, formData: SearchAnimalFormData): boolean => {
    if (formData.species && formData.species.toLowerCase() !== listing.species.toLowerCase()) {
        return false;
    }
    if (formData.type && formData.type !== listing.type) {
        return false;
    }
    if (formData.species && formData.species !== listing.species) {
        return false;
    }
    return true;
}

const sortBySearchData = (listings: AnimalListingWithDistance[], formData: SearchAnimalFormData): AnimalListingWithDistance[] => {
    return listings;
}

