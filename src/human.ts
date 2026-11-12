type Direction = "above" | "below" | "left" | "right";

abstract class Person {
  aboveSrc: string;
  belowSrc: string;
  leftSrc: string;
  rightSrc: string;
  direction: Direction;

  constructor(
    aboveSrc: string,
    belowSrc: string,
    leftSrc: string,
    rightSrc: string,
    initialDirection: Direction,
  ) {
    this.aboveSrc = aboveSrc;
    this.belowSrc = belowSrc;
    this.leftSrc = leftSrc;
    this.rightSrc = rightSrc;
    this.direction = initialDirection;
  }
}

export class Hero extends Person {
  constructor(
    aboveSrc: string,
    belowSrc: string,
    leftSrc: string,
    rightSrc: string,
    initialDirection: Direction,
  ) {
    super(aboveSrc, belowSrc, leftSrc, rightSrc, initialDirection);
  }
}
