import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
} from "@chakra-ui/react";

const HintPopoverContent = ({ hint }: { hint: string }) => (
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Hint</PopoverHeader>
    <PopoverBody>{hint}</PopoverBody>
  </PopoverContent>
);

export default HintPopoverContent;
