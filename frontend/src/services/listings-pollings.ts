import { AnimalListing } from "../common/animal-listing"
import { IPFS_NODE } from "../common/urls"

import localForage from "localforage";
import { BlockAnimal } from "../common/block-animal";
import { Hashes } from "./hashes-polling";
import axios from "axios";

export const initListingsPollings = async (type: string) => {
    const retrieveListing = async (hash: string, type: string): Promise<boolean> => {

        const listingItem = await getListingFromIpfs(hash, type);
        console.log(listingItem.prevHash, localStorage.getItem(listingItem.prevHash))
        localForage.setItem(hash, listingItem);
        if (listingItem.prevHash === 'null' || localStorage.getItem(listingItem.prevHash) === null) {
            return true;
        }
        return await retrieveListing(listingItem.prevHash, type);
    }

    while (true) {
        const hashesObject = localStorage.getItem('hashes');
        if (hashesObject === null) {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            return;
        }

        const hashes: Hashes = JSON.parse(hashesObject);
        const isDone = await retrieveListing(type === 'lost' ? hashes.lastBlock : hashes.lastFinded, type);
        if (isDone) {
            return;
        }
    }
}

const getListingFromIpfs = async (hash: string, type: string): Promise<AnimalListing> => {
    console.log(`${IPFS_NODE}/${hash}`);
    const result = await axios.get(`${IPFS_NODE}/${hash}`);
    const blockAnimal: BlockAnimal = result.data;

    return type === 'lost' ? {
        hash,
        prevHash: blockAnimal.prevhash,
        species: blockAnimal.species,
        type: 'lost',
        createdAt: new Date(blockAnimal.dateLost),
        location: {
            lat: blockAnimal.location.lat,
            lng: blockAnimal.location.lon,
        },
        imageUrl: blockAnimal.image,
        solved: false,
        owner: blockAnimal.owner,
        lostAt: new Date(blockAnimal.dateLost),
        dangeros: false,
        name: blockAnimal.name,
        race: blockAnimal.rase,
        note: blockAnimal.description
    } : {
        hash,
        prevHash: blockAnimal.prevhash,
        species: blockAnimal.species,
        createdAt: new Date(blockAnimal.dateAnunt),
        location: {
            lat: blockAnimal.location.lat,
            lng: blockAnimal.location.lon,
        },
        imageUrl: blockAnimal.image,
        solved: false,
        finder: blockAnimal.owner,
        type: 'found',
        foundAt: new Date(blockAnimal.dateAnunt),
        onlySeen: false
    };
}

const flattenArray = async (iter: AsyncIterable<Uint8Array>): Promise<Uint8Array> => {
    const arr: Uint8Array[] = [];
    for await (const i of iter) {
        arr.push(i);
    }
    const flatArr = new Uint8Array(arr.map(a => a.length).reduce((a, b) => a + b, 0));
    let offset = 0;
    for (const subarr of arr) {
        flatArr.set(subarr, offset);
        offset += subarr.length;
    }
    return flatArr;
}