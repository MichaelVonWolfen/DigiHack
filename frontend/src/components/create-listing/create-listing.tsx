import { Stepper, Button, Container, Center, Group, Stack, TextInput, Textarea, Text, Space } from '@mantine/core';
import { useState } from 'react';
import { DropFileUpload } from '../../components/drop-file-upload/drop-fiile-upload';
import { LocationPicker } from '../../components/location-picker/location-picker';
import { SpeciesPicker } from '../../components/species-picker/species-picker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface FoundAnimalFormData {
    species: string;
    imageFile: File | null;
    datetime: Date;
    location: {
        lat: number;
        lon: number;
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
    const [formData, setFormData] = useState<Partial<FoundAnimalFormData>>({});
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [activeStep, setActiveStep] = useState<number>(0);
    const nextStep = () => setActiveStep((current) => (current < steps.length ? current + 1 : current));

    const onSubmit = async () => {
        // send formData to server'
        console.log(formData)
        let submitableData = {
            owner: localStorage.getItem("owner") || "063a552e3e4548df1870b7fbc548065018b89652c31f81d514f2edc8c14b6eb1c69edc9f1a64caf1986bbbb56ef95fca307474520e5cee51288dbbd7152fbd58",
            cid : localStorage.getItem("cid") || "QmQXHejvtQF1p5X1NogXnfGHHmGe8upxicTodK1dknaRLq",
            location: formData.location,
            name:formData.name || "",
            description: formData.note || "",
            characteristics: [],
            species: formData.species || "",
            race: formData.race || "",
            dateLost: formData.datetime,
            dateAnunt: Date.now(),
            image: formData.imageFile
        }
        fetch("http://localhost:8080/upload", {
            method:"POST",
            body: JSON.stringify(submitableData)
        }).then(response =>{
            response.json().then(data => console.log(data))
            }
        )
    }

    const getComponentsPerStep = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return (<SpeciesPicker selectSpecies={(species) => {
                    setFormData({
                        ...formData,
                        species
                    })
                    setActiveStep(activeStep + 1)
                }} />);
            case 1:
                return (<DropFileUpload setFile={async (file) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFormData({
                            ...formData,
                            // @ts-ignore
                            imageFile: reader.result
                        })
                    };
                    await reader.readAsDataURL(file);
                }} />);
            case 2:
                return (<LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="DateTimePicker"
                        value={formData?.datetime ?? new Date()}
                        onChange={(datetime) => {
                            setFormData({
                                ...formData,
                                datetime: datetime ?? undefined
                            })
                        }}
                    />
                </LocalizationProvider>);
            case 3:
                return (<LocationPicker
                    width={600} height={400}
                    setLocation={(lat: number, lng: number) => {
                        // @ts-ignore
                        formData.location = {lat:lat(), lon:lng()}
                    }} />);
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
                console.log(formData)
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
                            <Center>
                                {step.message}
                            </Center>
                        </Stepper.Step>
                    );
                })}
                <Stepper.Completed>
                    <Center>
                        Completed, click back button to get to previous step
                    </Center>
                </Stepper.Completed>
            </Stepper>
            <Space h="xl" />
            <Center>
                {getComponentsPerStep(activeStep)}
            </Center>
            <Group position="center" mt="xl">
                {
                    activeStep !== 0 && activeStep !== 5 &&
                    <Button onClick={nextStep}>Next step</Button>
                }
            </Group>
        </Container>
    );
}