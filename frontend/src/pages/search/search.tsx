import { Container, Group, Stack, Select, Modal, Button, Center, SegmentedControl, Space } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Refresh } from 'tabler-icons-react';
import { AnimalListing, AnimalListingWithDistance, GeoCoordinates } from '../../common/animal-listing';
import { SPECIES_LIST } from '../../common/animal-species';
import { ListingCard } from '../../components/listing-card/listing-card';
import { LocationPicker } from '../../components/location-picker/location-picker';
import { getListing } from '../../services/listings-search';

export interface SearchAnimalFormData {
    type?: 'lost' | 'found';
    species?: string;
    before?: Date;
    after?: Date;
    location?: {
        lat: number;
        lng: number;
    };
    sort: 'distance' | 'datetime';
}


export default function Search() {
    const [formData, setFormData] = useState<SearchAnimalFormData>({
        sort: 'datetime',
    });
    const [openedLocationModal, setOpenedLocationModal] = useState<boolean>(false);
    const [openedPetLocationModal, setPetOpenedLocationModal] = useState<boolean>(false);
    const [selectedPet, setSelectedPet] = useState<number | null>(null);

    const [listingItems, setListingItems] = useState<AnimalListingWithDistance[]>([]);

    const refreshListings = () => {
        console.log(formData)
        getListing(formData).then(result => setListingItems(result));
    }
    useEffect(() => refreshListings(), [formData])

    const getSelectedListingLocation = (): GeoCoordinates | null => {
        const pet = listingItems.filter((_, index) => index === selectedPet)[0];
        if (pet === undefined) {
            return null;
        }
        return pet.location;
    }

    const showOnMapPerRow = (idx: number) => {
        return () => {
            setSelectedPet(idx);
            setPetOpenedLocationModal(true);
        }
    }

    return (
        <Container>
            <Modal
                opened={openedLocationModal}
                onClose={() => setOpenedLocationModal(false)}
                title="Location of interest"
            >
                <Center>
                    <LocationPicker height={320} width={450} initialPosition={getSelectedListingLocation() ?? {lat: 0, lng: 0}}
                        setLocation={(lat: number, lng: number) => formData.location = { lat, lng }}
                    />
                </Center>
            </Modal>
            <Modal
                opened={openedPetLocationModal}
                onClose={() => setPetOpenedLocationModal(false)}
                title='Last seen location'
            >
                <Center>
                    <LocationPicker height={320} width={450} initialPosition={{
                        lat: 44.43, lng: 26.09
                    }}
                        setLocation={(lat: number, lng: number) => formData.location = { lat, lng }}
                    />
                </Center>
            </Modal>
            <Group>
                <SegmentedControl
                    value={formData.type ?? 'both'}
                    transitionDuration={500}
                    transitionTimingFunction="linear"
                    onChange={(value) => setFormData({
                        ...formData,
                        type: value === 'lost' || value === 'found' ? value : undefined
                    })}
                    data={[
                        { value: 'lost', label: 'Lost' },
                        { value: 'found', label: 'Found' },
                        { value: 'both', label: 'Both' }
                    ]} />
                <SegmentedControl
                    value={formData.sort ?? 'datetime'}
                    transitionDuration={500}
                    transitionTimingFunction="linear"
                    onChange={(value) => setFormData({
                        ...formData,
                        sort: value === 'datetime' || value === 'distance' ? value : 'datetime'
                    })}
                    data={[
                        { value: 'datetime', label: 'Sort by date' },
                        { value: 'distance', label: 'Sort by distance' }
                    ]} />
                <Select
                    placeholder="Species"
                    clearable
                    onChange={(value) => setFormData({
                        ...formData,
                        species: value ?? undefined
                    })}
                    data={SPECIES_LIST.map(spec => {
                        return {
                            value: spec.toLowerCase(),
                            label: spec
                        };
                    })} />
                <Button onClick={() => setOpenedLocationModal(true)}>Location</Button>
                <Button onClick={() => refreshListings()}>
                    <Refresh
                        size={26}
                        strokeWidth={2}
                    />
                </Button>
            </Group>
            <Space h="xl" />
            <Stack>
                {listingItems.map((item, index) => {
                    return (
                        <ListingCard showOnMap={showOnMapPerRow(index)} key={item.hash || item.createdAt.toString()} item={item} currentLocation={{ lat: 44, lng: 20 }} />
                    );
                })}
            </Stack>
        </Container>
    );
}