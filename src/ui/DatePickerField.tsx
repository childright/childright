import type { DatePickerProps as Props } from "@mantine/dates";
import { DatePicker as Component } from "@mantine/dates";
import { useField } from "formik";

import "dayjs/locale/de";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { useContext } from "react";
import RiveContext from "../utils/AnimationContext";
import useRiveStateInput from "../hooks/useRiveStateInput";
dayjs.extend(customParseFormat);

export type DatePickerProps = { name: string } & Omit<Props, "error" | "value">;

export function DatePickerField({ name, ...rest }: DatePickerProps) {
  const [field, meta, helpers] = useField<Date | undefined>(name);

  const riveTyping = useRiveStateInput("typing");

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
      onBlur={(e) => {
        helpers.setTouched(true, true);
        riveTyping && (riveTyping.value = false);
        field.onBlur(e);
      }}
      onFocus={() => {
        riveTyping && (riveTyping.value = true);
      }}
    />
  );
}

export default DatePickerField;
