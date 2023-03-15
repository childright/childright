import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props {
  text: string;
}

const WizardComment: FC<Props> = ({ text }) => {
  return (
    <div className="">
      <p>{text}</p>
      <Button>Weiter</Button>
    </div>
  );
};

export default WizardComment;

//temporary content. will be changed.
