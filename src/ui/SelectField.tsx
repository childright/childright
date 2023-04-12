import type { SelectProps as Props } from "@mantine/core";
import { Select as Component } from "@mantine/core";
import { useField } from "formik";
import useRiveStateInput from "../hooks/useRiveStateInput";

export type NumberInputProps = { name: string } & Omit<
  Props,
  "error" | "value"
>;

export const SelectField = ({ name, ...rest }: NumberInputProps) => {
  const [field, meta, helpers] = useField<string | undefined>(name);

  const riveTyping = useRiveStateInput("typing");

  return (
    <Component
      {...rest}
      {...field}
      error={meta.touched && meta.error}
      value={field.value}
      onChange={(val) => {
        val && helpers.setValue(val);
      }}
      onFocus={() => {
        riveTyping && (riveTyping.value = true);
      }}
      onBlur={(e) => {
        helpers.setTouched(true);
        riveTyping && (riveTyping.value = false);
        field.onBlur(e);
      }}
    />
  );
};

export default SelectField;
