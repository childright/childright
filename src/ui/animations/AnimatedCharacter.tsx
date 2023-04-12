import {
  CanvasHTMLAttributes,
  createRef,
  DetailedHTMLProps,
  FC,
  useRef,
} from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useStateMachineInput } from "@rive-app/react-canvas";
import RiveContext from "../../utils/AnimationContext";
import { DEFAULT_STATE_MACHINE } from "../../utils/constants";
import useRiveStateInput from "../../hooks/useRiveStateInput";

const AnimatedCharacter: FC<
  DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
> = ({ className }) => {
  const { rive, RiveComponent, canvas } = useContext(RiveContext);

  const validationSuccessInput = useRiveStateInput("validation success");

  const mouseXInput = useRiveStateInput("mouseX");
  const mouseYInput = useRiveStateInput("mouseY");

  const riveRef = useRef<HTMLCanvasElement>(null);

  // Update mouse position when mouse moves
  const handleMouseMove = (event: MouseEvent) => {
    if (canvas) {
      const { left, top, width, height } = canvas.getBoundingClientRect();

      // Calculate the position of the mouse relative to the center of the element
      const x = event.pageX - (left + width / 2);
      const y = event.pageY - (top + height / 2);

      if (mouseXInput && mouseYInput) {
        mouseXInput.value = x;
        mouseYInput.value = y;
      }
    }
  };

  useEffect(() => {
    if (document) {
      document.onmousemove = handleMouseMove; /*  (e) => {
        const x = (e.pageX / window.innerWidth) * 100;
        const y = (e.pageY / window.innerHeight) * 100;
        if (mouseXInput && mouseYInput) {
          console.log(x, y);
          mouseXInput.value = x;
          mouseYInput.value = y;
        }
      }; */
    }
  }, [mouseXInput, mouseYInput]);

  if (RiveComponent === null) return null;

  return (
    <RiveComponent
      ref={riveRef}
      className={className}
      onClick={() => validationSuccessInput?.fire()}
    />
  );
};
export default AnimatedCharacter;

export const AbsoluteAnimatedCharacter: FC = () => (
  <AnimatedCharacter className="absolute bottom-[-20px] left-[-35px] h-[300px] w-[300px]" />
);

export const AnimatedCharacterElement = <AbsoluteAnimatedCharacter />;
