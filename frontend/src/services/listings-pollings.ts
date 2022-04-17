import { AnimalListing } from "../common/animal-listing"
import { create } from 'ipfs-http-client'
import { IPFS_NODE } from "../common/urls"

import localForage from "localforage";
import { BlockAnimal } from "../common/block-animal";
import { Hashes } from "./hashes-polling";
import axios from "axios";

export const initListingsPollings = async () => {

    
    const retrieveListing = async (hash: string): Promise<void> => {

        const listingItem = await getListingFromIpfs(hash);
        localForage.setItem(hash, listingItem);
        await retrieveListing(listingItem.prevHash);
    }

    while (true) {
        const hashes = localStorage.getItem('hashes');
        console.log(hashes);
        if (hashes === null) {
            await new Promise(resolve => setTimeout(resolve, 5000)); 
            continue;
        }

        await retrieveListing((JSON.parse(hashes) as Hashes).lastBlock);
    }

}

const getListingFromIpfs = async (hash: string): Promise<AnimalListing> => {
    console.log(`${IPFS_NODE}/${hash}`);
    const result = await axios.get(`${IPFS_NODE}/${hash}`);
    const blockAnimal: BlockAnimal = result.data;

    return blockAnimal.owner === null ? {
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
        owner: 'test',
        lostAt: new Date(blockAnimal.dateLost),
        dangeros: false,
        name: blockAnimal.name,
        race: blockAnimal.rase,
        note: blockAnimal.description
    } : {
        hash,
        prevHash: blockAnimal.prevhash,
        species: 'cat',
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