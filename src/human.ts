import type { ControllerEvent } from "./controller";

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

  checkHeroEvent(event: ControllerEvent) {
    if (event.mode === "talk") return;

    switch (event.command) {
      case "above":
        if (this.direction === "above") return false;
        this.direction = "above";
        return true;
      case "below":
        if (this.direction === "below") return false;
        this.direction = "below";
        return true;
      case "left":
        if (this.direction === "left") return false;
        this.direction = "left";
        return true;
      case "right":
        if (this.direction === "right") return false;
        this.direction = "right";
        return true;
    }
  }
}
