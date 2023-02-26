import { CanvasHTMLAttributes, DetailedHTMLProps, FC, useState } from "react";
import Rive, { useRive } from "@rive-app/react-canvas";

const AnimatedCharacter: FC<
  DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
> = ({ className }) => {
  const { rive, RiveComponent } = useRive({
    src: "/exampleCharacterAnimation.riv",
    autoplay: true,
  });

  const [counter, setCounter] = useState(0);

  rive?.on("loop" as any, () => {
    console.log(counter);
    setCounter((c) => c + 1);
  });

  const togglePlaying = () => {
    if (rive?.isPlaying) rive.pause();
    else if (rive?.isPaused) rive.play();
  };

  return (
    <RiveComponent className={className} onClick={() => togglePlaying()} />
  );
};
export default AnimatedCharacter;

export const AbsoluteAnimatedCharacter: FC = () => (
  <AnimatedCharacter className="absolute bottom-[-20px] left-[-35px] h-40 w-40 md:h-56 md:w-56" />
);

export const AnimatedCharacterElement = <AbsoluteAnimatedCharacter />;
