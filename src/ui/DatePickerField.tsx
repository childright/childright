import type { DatePickerProps as Props } from "@mantine/dates";
import { DatePicker as Component } from "@mantine/dates";
import { useField } from "formik";

import "dayjs/locale/de";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);

export type DatePickerProps = { name: string } & Omit<Props, "error" | "value">;

export function DatePickerField({ name, ...rest }: DatePickerProps) {
  const [field, meta, helpers] = useField<Date | undefined>(name);
  return (
    <Component
      {...rest}
      {...field}
      locale="de"
      inputFormat="DD.MM.YYYY"
      allowFreeInput
      onChange={(v) => {
        helpers.setValue(v ? v : undefined, true);
      }}
      error={meta.touched && meta.error}
      onBlur={() => helpers.setTouched(true, true)}
    />
  );
}

export default DatePickerField;
