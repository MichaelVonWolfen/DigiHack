import { SearchFormBlockAnimal } from "../models";
import * as IPFS from 'ipfs-core'

export class SearchService {

    constructor(
        private readonly ipfs: IPFS.IPFS
    ) {}

    public search = (searchForm: SearchFormBlockAnimal) => {
        this.ipfs.add
    }

    public static async init(): Promise<SearchService> {
        const ipfs = await IPFS.create();
        return new SearchService(ipfs);
    }

}