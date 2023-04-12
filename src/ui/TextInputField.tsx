import type { TextInputProps as Props } from "@mantine/core";
import { TextInput as Component } from "@mantine/core";
import { useField } from "formik";
import useRiveStateInput from "../hooks/useRiveStateInput";

export type TextInputProps = { name: string } & Omit<Props, "value" | "error">;

export function TextInputField({ name, ...rest }: TextInputProps) {
  const [field, meta] = useField<string>(name);

  const riveTyping = useRiveStateInput("typing");

  return (
    <Component
      {...rest}
      error={meta.touched && meta.error}
      {...field}
      onBlur={(e) => {
        riveTyping && (riveTyping.value = false);
        field.onBlur(e);
      }}
      onFocus={() => {
        riveTyping && (riveTyping.value = true);
      }}
    />
  );
}

export default TextInputField;
