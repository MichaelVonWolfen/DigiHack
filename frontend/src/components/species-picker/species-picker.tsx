import { Grid, Button } from '@mantine/core';
import { SPECIES_LIST } from '../../common/animal-species';
import "./Picker.sass"
export interface SpeciesPickerProps {
  selectSpecies: (species: string) => void;
}

export function SpeciesPicker(props: SpeciesPickerProps) {

  return (
    <Grid justify="center">
      {SPECIES_LIST.map((species: string) => {
        return (
          <Grid.Col key={species} span={6} >
            <Button className={"buttonContainer"} onClick={() => props.selectSpecies(species.toLowerCase())} variant="outline">
              {species}
            </Button>
          </Grid.Col>
        );
      })}

    </Grid>
  );
}
