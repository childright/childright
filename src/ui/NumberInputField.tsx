import type { NumberInputProps as Props } from "@mantine/core";
import { NumberInput as Component } from "@mantine/core";
import { useField } from "formik";

export type NumberInputProps = { name: string } & Omit<
  Props,
  "error" | "value"
>;

export const NumberInputField = ({
  name,
  onChange,
  ...rest
}: NumberInputProps) => {
  const [field, meta, helpers] = useField<number | undefined>(name);

  return (
    <Component
      {...rest}
      {...field}
      error={meta.touched && meta.error}
      onChange={(v) => {
        helpers.setValue(v);
        onChange && onChange(v);
      }}
    />
  );
};

export default NumberInputField;
