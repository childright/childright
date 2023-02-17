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
  onFocus,
  ...rest
}: NumberInputProps) => {
  const [{ value }, { error, touched }, { setValue, setTouched }] = useField<
    number | undefined
  >(name);
  return (
    <Component
      {...rest}
      error={touched && error}
      onFocus={(e) => {
        setTouched(true, true);
        onFocus && onFocus(e);
      }}
      value={value}
      onChange={(v) => {
        setValue(v);
        onChange && onChange(v);
      }}
    />
  );
};

export default NumberInputField;
