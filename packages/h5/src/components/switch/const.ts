export interface PointProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  move: { x: number; y: number };
  moveVector: { x: number; y: number };
  isMove: boolean;
  middle?: boolean;
  status: boolean;
  transformX?: number;
  ballSizeWidth?: number;
  ballInstance?: HTMLElement;
  ballSize?: DOMRect;
  size?: DOMRect;
  taste?: {
    left: number;
    padding: number;
    deformation: number;
    right: number;
  };
}
