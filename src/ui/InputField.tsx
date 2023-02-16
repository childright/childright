import React from "react";
import type { FieldHookConfig } from "formik";
import { useField } from "formik";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightAddon,
  Popover,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import HintPopoverContent from "./HintPopoverContent";

type Props = FieldHookConfig<number> & {
  label?: string;
  hint?: string;
};

const InputField = ({ label, hint, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input {...field} />
        {hint && (
          <InputRightAddon>
            <Popover>
              <PopoverTrigger>
                <Button>?</Button>
              </PopoverTrigger>
              <HintPopoverContent hint={hint} />
            </Popover>
          </InputRightAddon>
        )}
      </InputGroup>
      {meta.touched && !!meta.error && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default InputField;
