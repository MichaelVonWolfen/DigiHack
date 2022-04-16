import { DatePicker, TimeInput } from '@mantine/dates';

export interface DatePickerProps {
  dateLabel: string;
  timeLabel: string;
  setDate: (date: Date | null) => void;
  setTime: (date: Date | null) => void;
}

export function DateTimePicker(props: DatePickerProps) {

  return (
    <>
      <DatePicker
        placeholder="Pick date"
        label={props.dateLabel}
        maxDate={new Date()}
        onChange={(date) => props.setDate(date)}
      />
      <TimeInput
        defaultValue={new Date()}
        label={props.timeLabel}
        description="Approximate to hour"
        format="12"
        required
        clearable
        onChange={(date) => props.setTime(date)}
      />
    </>
  );
}
