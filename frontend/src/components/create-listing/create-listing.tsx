import { Stepper, Button, Container, Center, Group, Stack, TextInput, Textarea, Text } from '@mantine/core';
import { useState } from 'react';
import { DateTimePicker } from '../../components/date-picker/date-picker';
import { DropFileUpload } from '../../components/drop-file-upload/drop-fiile-upload';
import { LocationPicker } from '../../components/location-picker/location-picker';
import { SpeciesPicker } from '../../components/species-picker/species-picker';

interface FoundAnimalFormData {
    species: string;
    imageFile: File | null;
    date: Date;
    time: Date;
    location: {
        lat: number;
        lng: number;
    };
    race?: string;
    name?: string;
    note?: string;
}

const steps = [{
    name: 'Species',
    message: 'What species best describe your pet?',
}, {
    name: 'Photo',
    message: 'How does your pet look like (on a good day)?',
}, {
    name: 'Date & time',
    message: 'When have you lost it?',
}, {
    name: 'Location',
    message: 'Where have you lost it?',
}, {
    name: 'Details',
    message: 'Any other detail might help',
}];

export interface CreateListingProps {
    type: 'lost' | 'found';
}

export default function CreateListing(props: CreateListingProps) {
    const [formData, setFormData] = useState<Partial<FoundAnimalFormData>>();
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [activeStep, setActiveStep] = useState<number>(0);
    const nextStep = () => setActiveStep((current) => (current < steps.length ? current + 1 : current));

    const onSubmit = async () => {
        // send formData to server
    }

    const getComponentsPerStep = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return (<SpeciesPicker selectSpecies={(species) => setFormData({
                    ...formData,
                    species
                })} />);
            case 1:
                return (<DropFileUpload setFile={(file) => setFormData({
                    ...formData,
                    imageFile: file
                })} />);
            case 2:
                return (<>
                    <DateTimePicker
                        dateLabel="Day you have found the lost pet"
                        timeLabel="Hour you have found the lost pet"
                        setDate={(date) => setFormData({
                            ...formData,
                            date: date ?? undefined
                        })}
                        setTime={(date) => setFormData({
                            ...formData,
                            time: date ?? undefined
                        })}
                    />
                </>);
            case 3:
                return (<LocationPicker setLocation={(lat: number, lng: number) => setFormData({
                    ...formData,
                    location: {
                        lat,
                        lng
                    }
                })} />);
            case 4:
                return (<Stack>
                    <Text>
                        None are required, but any information may be helpful.
                    </Text>
                    <TextInput
                        placeholder="ex: German Shepard, Shiba Inu"
                        label="Race"
                        onChange={(event) => setFormData({
                            ...formData,
                            race: event.target.value
                        })}
                    />
                    {props.type === 'lost' &&
                        <TextInput
                            placeholder="Any name it may respond to"
                            label="Name"
                            onChange={(event) => setFormData({
                                ...formData,
                                name: event.target.value
                            })}
                        />
                    }
                    <Textarea
                        placeholder="ex: missing legs, scars, collar"
                        label="Anything of note"
                        onChange={(event) => setFormData({
                            ...formData,
                            note: event.target.value
                        })}
                    />
                </Stack>);
            default:
                return (<Button loading={submitting} size="md" onClick={() => {
                    setSubmitting(true);
                    onSubmit().then(() => setSubmitting(false));
                }}>
                    Submit
                </Button>)
        }
    }

    return (
        <Container>
            <Stepper active={activeStep} breakpoint="sm">
                {steps.map(step => {
                    return (
                        <Stepper.Step key={step.name} label={step.name} allowStepSelect={false}>
                            {step.message}
                        </Stepper.Step>
                    );
                })}
                <Stepper.Completed>
                    Completed, click back button to get to previous step
                </Stepper.Completed>
            </Stepper>
            <Center>
                {getComponentsPerStep(activeStep)}
            </Center>
            <Group position="center" mt="xl">
                <Button onClick={nextStep}>Next step</Button>
            </Group>
        </Container>
    );
}