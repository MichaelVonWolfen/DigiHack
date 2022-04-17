import { Container, Group, Stack, Select, Modal, Button, Center, SegmentedControl, Space } from '@mantine/core';
import { useState } from 'react';
import { AnimalListing } from '../../common/animal-listing';
import { SPECIES_LIST } from '../../common/animal-species';
import { ListingCard } from '../../components/listing-card/listing-card';
import { LocationPicker } from '../../components/location-picker/location-picker';

interface SearchAnimalFormData {
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
    const [formData, setFormData] = useState<Partial<SearchAnimalFormData>>({
        sort: 'datetime',
    });
    const [openedLocationModal, setOpenedLocationModal] = useState(false);
    const listingItems: AnimalListing[] = [
        {
            species: 'dog',
            type: 'lost',
            createdAt: new Date(),
            location: {
                lat: 44.05, 
                lng: 20.01
            },
            imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*',
            solved: true,
            owner: 'test',
            lostAt: new Date(),
            dangeros: true,
            name: 'Rusty',
            race: 'German Shepard',
            note: 'Good boy'
        }, {
            species: 'cat',
            createdAt: new Date(),
            location: {
                lat: 44.06, 
                lng: 20.09
            },
            imageUrl: 'https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop',
            solved: false,
            finder: 'test',
            type: 'found',
            foundAt: new Date(),
            onlySeen: true
        }
    ];

    return (
        <Container>
            <Modal
                opened={openedLocationModal}
                onClose={() => setOpenedLocationModal(false)}
                title="Location of interest"
            >
                <Center>
                    <LocationPicker height={320} width={450}
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
                        sort: value === 'datetime' || value === 'distance' ? value : undefined
                    })}
                    data={[
                        { value: 'datetime', label: 'Sort by date' },
                        { value: 'distance', label: 'Sort by distance' }
                    ]} />
                <Select
                    placeholder="Species"
                    clearable
                    data={SPECIES_LIST.map(spec => {
                        return {
                            value: spec.toLowerCase(),
                            label: spec
                        };
                    })} />
                <Button onClick={() => setOpenedLocationModal(true)}>Location</Button>
            </Group>
            <Space h="xl" />
            <Stack>
                {listingItems.map(item => {
                    return (
                        <ListingCard item={item} currentLocation={{ lat: 44, lng: 20 }} />
                    );
                })}
            </Stack>
        </Container>
    );
}