import type { TextInputProps as Props } from "@mantine/core";
import { TextInput as Component } from "@mantine/core";
import { useField } from "formik";

export type TextInputProps = { name: string } & Omit<Props, "value" | "error">;

export function TextInputField({ name, ...rest }: TextInputProps) {
  const [field, meta] = useField<string>(name);
  return <Component {...rest} error={meta.touched && meta.error} {...field} />;
}

export default TextInputField;
