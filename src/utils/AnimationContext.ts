import type { Rive } from "@rive-app/react-canvas";
import type { CanvasHTMLAttributes, DetailedHTMLProps } from "react";
import { createContext } from "react";

const RiveContext = createContext<{
  rive: Rive | null;
  RiveComponent: (() => JSX.Element) | null;
  canvas: HTMLCanvasElement | null;
}>({ rive: null, RiveComponent: null, canvas: null });

export default RiveContext;
