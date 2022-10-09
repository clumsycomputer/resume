import { RecursiveSpatialStructure } from "clumsy-math";
import { Circle, Point2 } from "../general/encodings";

export type LoopStructure = RecursiveSpatialStructure<
  { loopBase: Circle },
  {},
  {
    relativeSubRadius: number;
    relativeSubDepth: number;
    subPhase: number;
    subOrientation: number;
    loopRotation: number;
  }
>;

export type LoopPoint = [
  x: Point2[0],
  y: Point2[1],
  origin: Point2,
  terminalSubRadius: number,
  inputAngle: number
];

export type _LoopPoint = [
  x: LoopPoint[0],
  y: LoopPoint[1],
  origin: LoopPoint[2],
  terminalSubRadius: LoopPoint[3]
];
