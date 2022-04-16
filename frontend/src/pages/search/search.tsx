import { Container, Group, Stack, Select, Modal, Button } from '@mantine/core';
import { useState } from 'react';
import { SPECIES_LIST } from '../../common/animal-species';
import c from '@mui/material/TextField';


export default function Search() {
    const [openedLocationPopover, setOpenedLocationPopover] = useState(false);

    return (
        <Container>
            <Modal
                opened={openedLocationPopover}
                onClose={() => setOpenedLocationPopover(false)}
                title="Introduce yourself!"
            >
                {/* Modal content */}
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
                <Button onClick={() => setOpenedLocationPopover(true)}>Location</Button>
            </Group>
            <Stack>

            </Stack>
        </Container>
    );
}