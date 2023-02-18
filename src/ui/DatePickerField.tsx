import type { DatePickerProps as Props } from "@mantine/dates";
import { DatePicker as Component } from "@mantine/dates";
import { useField } from "formik";

import "dayjs/locale/de";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

export type DatePickerProps = { name: string } & Omit<Props, "error" | "value">;

export function DatePickerField({ name, onFocus, ...rest }: DatePickerProps) {
  const [{ value }, {}, { setValue, setTouched }] = useField<Date | undefined>(
    name
  );
  return (
    <Component
      {...rest}
      locale="de"
      inputFormat="DD.MM.YYYY"
      allowFreeInput
      value={value}
      onFocus={(e) => {
        setTouched(true, true);
        onFocus && onFocus(e);
      }}
      onChange={(v) => {
        setValue(v ? v : undefined);
      }}
    />
  );
}

export default DatePickerField;
