import type { SelectProps as Props } from "@mantine/core";
import { Select as Component } from "@mantine/core";
import { useField } from "formik";

export type NumberInputProps = { name: string } & Omit<
  Props,
  "error" | "value"
>;

export const SelectField = ({ name, ...rest }: NumberInputProps) => {
  const [field, meta, helpers] = useField<string | undefined>(name);

  return (
    <Component
      {...rest}
      {...field}
      error={meta.touched && meta.error}
      value={field.value}
      onChange={(val) => {
        val && helpers.setValue(val);
      }}
      onBlur={() => {
        helpers.setTouched(true);
      }}
    />
  );
};

export default SelectField;
