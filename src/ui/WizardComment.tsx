import { FC } from "react";

interface Props {
  text: string;
}

const WizardComment: FC<Props> = ({ text }) => {
  return (
    <div className="">
      <p>{text}</p>
    </div>
  );
};

export default WizardComment;
