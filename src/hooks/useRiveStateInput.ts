import { useStateMachineInput } from "@rive-app/react-canvas";
import { useContext } from "react";
import RiveContext from "../utils/AnimationContext";
import { DEFAULT_STATE_MACHINE } from "../utils/constants";

type InputName =
  | "validation success"
  | "validation fail"
  | "typing"
  | "mouseX"
  | "mouseY";

const useRiveStateInput = (inputName: InputName) => {
  const { rive } = useContext(RiveContext);

  return useStateMachineInput(rive, DEFAULT_STATE_MACHINE, inputName);
};

export default useRiveStateInput;
