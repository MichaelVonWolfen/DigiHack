import { Paper, Image, Group, Stack, Text, Badge, Avatar } from '@mantine/core';
import { AnimalListing, GeoCoordinates } from '../../common/animal-listing';
import haversine from 'haversine-distance';
import { Eye, AlertTriangle, CircleCheck } from 'tabler-icons-react';

export interface ListingCardProps {
    item: AnimalListing;
    currentLocation: GeoCoordinates;
}

export function ListingCard(props: ListingCardProps) {

    // const [phone, setPhone] = 

    const getDistance = (): string => {
        const distanceInMeters = haversine(props.item.location, props.currentLocation);
        return distanceInMeters > 1000 ? `${(distanceInMeters / 1000).toFixed(2)}km` : `${Math.ceil(distanceInMeters / 10) * 10}m`;
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
                </Stack>
            </Group>
        </Paper>
    );
}

