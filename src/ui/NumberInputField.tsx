import React from "react";
import { useField } from "formik";
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  Popover,
  PopoverTrigger,
  NumberInputField as ChakraNumberInputField,
  FormErrorMessage,
} from "@chakra-ui/react";

import HintPopoverContent from "./HintPopoverContent";

type Props = {
  name: string;
  label?: string;
  hint?: string;
  min?: number;
  max?: number;
};

const InputField = ({ name, label, hint, min, max }: Props) => {
  const [field, meta, helpers] = useField<number | undefined>(name);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <NumberInput
          {...field}
          value={field.value ?? ""}
          onChange={(val, numberVal) => {
            if (isNaN(numberVal)) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
              return helpers.setValue(val === "" ? undefined : (val as any));
            }
            helpers.setValue(numberVal);
          }}
          isInvalid={meta.touched && !!meta.error}
          min={min}
          max={max}
        >
          <ChakraNumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

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
