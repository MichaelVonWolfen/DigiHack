import { Paper, Image, Group, Stack, Text, Badge, Avatar, Button } from '@mantine/core';
import { AnimalListing, AnimalListingWithDistance, GeoCoordinates } from '../../common/animal-listing';
import { Eye, AlertTriangle, CircleCheck, BrandWhatsapp, BrandAndroid, BrandApple } from 'tabler-icons-react';
import { getPhoneNumberForWallet } from '../../services/wallet-service';
import { useState } from 'react';

export interface ListingCardProps {
    item: AnimalListingWithDistance;
    currentLocation: GeoCoordinates;
    showOnMap: () => void;
}

export function ListingCard(props: ListingCardProps) {

    const [phone, setPhone] = useState<string | undefined>(undefined);

    const getDistance = (): string | null => {
        const dist = props.item.distanceInMeters;
        if (!dist) {
            return null;
        }
        return dist > 1000 ? `${(dist / 1000).toFixed(2)}km` : `${Math.ceil(dist / 10) * 10}m`;
    }

    const getPhoneNumber = async (): Promise<void> => {
        const phoneNumber = await getPhoneNumberForWallet(props.item.hash!);
        setPhone(phoneNumber);
    }

    return (
        <Paper shadow="xs" radius="xs" p="lg">
            <Group>
                <Image
                    width={180}
                    height={180}
                    src={props.item.imageUrl}
                    alt="With default placeholder"
                    withPlaceholder
                />
                <Stack>
                    {props.item.hash && <Text size="xs" color="red">{props.item.hash}</Text>}
                    <Group>
                        <Text weight={700} size="lg">
                            {props.item.type === 'lost' && props.item.name !== undefined ? `${props.item.name} (${props.item.species})` : props.item.species}
                        </Text>
                        <Text size="lg">
                            {getDistance()}
                        </Text>
                    </Group>
                    {props.item.race !== undefined && <Text size="sm" color="gray">
                        {props.item.race}
                    </Text>}
                    <Text>
                        {props.item.note}
                    </Text>
                    <Group>
                        {props.item.type === 'found' && props.item.onlySeen &&
                            <Badge
                                variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                                size="lg" radius="xl" leftSection={
                                    <Eye size={10} />
                                }>
                                Only seen
                            </Badge>
                        }
                        {props.item.type === 'lost' && props.item.dangeros &&
                            <Badge
                                variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                                size="lg" radius="xl" leftSection={
                                    <AlertTriangle size={10} />
                                }>
                                Dangeros
                            </Badge>
                        }
                        {props.item.solved &&
                            <Badge
                                variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                                size="lg" radius="xl" leftSection={
                                    <CircleCheck size={10} />
                                }>
                                Solved
                            </Badge>
                        }
                    </Group>
                    <Group>
                        {phone
                            ? <>
                                <Button component="a" href={`tel:${phone}`} leftIcon={<BrandAndroid size={18}/>} rightIcon={<BrandApple size={18} />}>
                                    Call on Phone
                                </Button>
                                <Button
                                    component="a"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://api.whatsapp.com/send?phone=${phone}`}
                                    leftIcon={<BrandWhatsapp size={18} />}
                                >
                                    Whatsapp
                                </Button>
                            </>
                            : <Button onClick={() => getPhoneNumber()}>
                                Contact
                            </Button>
                        }
                        <Button onClick={() => props.showOnMap()}>
                            Show on map
                        </Button>
                    </Group>
                </Stack>
            </Group>
        </Paper>
    );
}

