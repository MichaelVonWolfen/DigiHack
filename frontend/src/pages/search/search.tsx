import { Container, Group, Stack, Select, Modal, Button, Center } from '@mantine/core';
import { useState } from 'react';
import { SPECIES_LIST } from '../../common/animal-species';
import { LocationPicker } from '../../components/location-picker/location-picker';

interface SearchAnimalFormData {
    species?: string;
    before?: Date;
    after?: Date;
    location?: {
        lat: number;
        lng: number;
    };
}


export default function Search() {
    const [formData, setFormData] = useState<Partial<SearchAnimalFormData>>({});
    const [openedLocationModal, setOpenedLocationModal] = useState(false);

    return (
        <Container>
            <Modal
                opened={openedLocationModal}
                onClose={() => setOpenedLocationModal(false)}
                title="Location of interest"
            >
                <Center>
                    <LocationPicker height={320} width={450}
                        setLocation={(lat: number, lng: number) => setFormData({
                            ...formData,
                            location: { lat, lng }
                        })}
                    />
                </Center>
            </Modal>
            <Group>
                <Select
                    placeholder="Lost or Found?"
                    clearable
                    data={[
                        { value: 'lost', label: 'Lost' },
                        { value: 'found', label: 'Found' },
                        { value: 'both', label: 'Both' }
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
            <Stack>

            </Stack>
        </Container>
    );
}