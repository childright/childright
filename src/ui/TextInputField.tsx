import type { TextInputProps as Props } from "@mantine/core";
import { TextInput as Component } from "@mantine/core";
import { useField } from "formik";

export type TextInputProps = { name: string } & Omit<Props, "value" | "error">;

export function TextInputField({
  name,
  onBlur,
  onFocus,
  onChange,
  ...rest
}: TextInputProps) {
  const [{ value, onBlur: formikOnBlur }, { error }, { setValue, setTouched }] =
    useField<string>(name);
  return (
    <Component
      {...rest}
      error={error}
      value={value}
      onBlur={(e) => {
        formikOnBlur(e);
        onBlur && onBlur(e);
      }}
      onFocus={(e) => {
        onFocus && onFocus(e);
        setTouched(true);
      }}
      onChange={(v) => {
        setValue(v.target.value);
        onChange && onChange(v);
      }}
    />
  );
}

export default TextInputField;
