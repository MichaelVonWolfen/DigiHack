import { Grid, Button } from '@mantine/core';
import { SPECIES_LIST } from '../../common/animal-species';

export interface SpeciesPickerProps {
  selectSpecies: (species: string) => void;
}

export function SpeciesPicker(props: SpeciesPickerProps) {

  return (
    <Grid>
      {SPECIES_LIST.map((species: string) => {
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
