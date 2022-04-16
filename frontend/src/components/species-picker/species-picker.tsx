import { Grid, Button } from '@mantine/core';
import { ExternalLink } from 'tabler-icons-react';

const speciesList = [
  'Dog', 'Cat', 'Bird', 'Rodent', 'Reptile', 'Other'
]

export interface SpeciesPickerProps {
  selectSpecies: (species: string) => void;
}

export function SpeciesPicker(props: SpeciesPickerProps) {

  return (
    <Grid>
      {speciesList.map((species: string) => {
        return (
          <Grid.Col key={species} span={6}>
            <Button onClick={() => props.selectSpecies(species.toLowerCase())} variant="outline">
              {species}
            </Button>
          </Grid.Col>
        );
      })}

    </Grid>
  );
}
