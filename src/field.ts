import {
  ALL_FIELD_TILE_SIZE_PER_CANVAS,
  VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
} from "./constants/field_tile";
import type { ControllerEvent } from "./controller";

export class Field {
  objects: FieldObject[];
  xPoint: number;
  yPoint: number;

  constructor(startXPoint: number, startYPoint: number) {
    this.objects = this.createObjects();
    this.xPoint = startXPoint;
    this.yPoint = startYPoint;
  }

  checkFieldEvent(event: ControllerEvent) {
    if (event.mode === "talk") return;

    switch (event.command) {
      case "above":
        if (this.yPoint === 0) return;
        this.yPoint -= 1;
        return;
      case "below":
        if (
          this.yPoint ===
          ALL_FIELD_TILE_SIZE_PER_CANVAS - VISIBLE_FIELD_TILE_SIZE_PER_CANVAS
        )
          return;
        this.yPoint += 1;
        return;
      case "left":
        if (this.xPoint === 0) return;
        this.xPoint -= 1;
        return;
      case "right":
        if (
          this.xPoint ===
          ALL_FIELD_TILE_SIZE_PER_CANVAS - VISIBLE_FIELD_TILE_SIZE_PER_CANVAS
        )
          return;
        this.xPoint += 1;
        return;
    }
  }

  private createObjects() {
    const objects: FieldObject[] = [];
    for (let xi = 0; xi < ALL_FIELD_TILE_SIZE_PER_CANVAS; xi++) {
      for (let yi = 0; yi < ALL_FIELD_TILE_SIZE_PER_CANVAS; yi++) {
        if (
          xi === 0 ||
          yi === 0 ||
          xi === ALL_FIELD_TILE_SIZE_PER_CANVAS - 1 ||
          yi === ALL_FIELD_TILE_SIZE_PER_CANVAS - 1
        ) {
          objects.push(new BaseBlack(xi, yi));
          continue;
        }
        objects.push(new BaseGrass(xi, yi));
        objects.push(new ItemGrass(xi, yi));
      }
    }
    return objects;
  }
}

export abstract class FieldObject {
  xPoint: number;
  yPoint: number;
  src: string;

  constructor(xPoint: number, yPoint: number, src: string) {
    this.xPoint = xPoint;
    this.yPoint = yPoint;
    this.src = src;
  }
}

class ItemGrass extends FieldObject {
  constructor(x: number, y: number) {
    super(x, y, "./src/assets/item_grass.svg");
  }
}

class BaseBlack extends FieldObject {
  constructor(x: number, y: number) {
    super(x, y, "./src/assets/base_black.svg");
  }
}

class BaseGrass extends FieldObject {
  constructor(x: number, y: number) {
    super(x, y, "./src/assets/base_grass.svg");
  }
}
