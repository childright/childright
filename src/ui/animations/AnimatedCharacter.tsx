import type { CanvasHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { useRive } from "@rive-app/react-canvas";

const AnimatedCharacter: FC<
  DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
> = ({ className }) => {
  const { rive, RiveComponent } = useRive({
    src: "/exampleCharacterAnimation.riv",
    autoplay: true,
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
  <AnimatedCharacter className="absolute bottom-[-20px] left-0 h-56 w-56" />
);
