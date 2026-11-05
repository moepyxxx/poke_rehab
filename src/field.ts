const FIELD_TILE_SIZE_PER_CANVAS = 5;
import GrassImage from "./assets/grass.svg";

export class Field {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  objects: FieldObject[];

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.objects = this.createObjects();
  }

  createObjects() {
    const objects: FieldObject[] = [];
    for (let xi = 0; xi < FIELD_TILE_SIZE_PER_CANVAS; xi++) {
      for (let yi = 0; yi < FIELD_TILE_SIZE_PER_CANVAS; yi++) {
        objects.push(
          new ItemGrass(
            this.canvas,
            this.ctx,
            xi * (this.canvas.width / FIELD_TILE_SIZE_PER_CANVAS),
            yi * (this.canvas.width / FIELD_TILE_SIZE_PER_CANVAS),
          ),
        );
      }
    }
    return objects;
  }

  draw() {
    this.objects.forEach((obj) => obj.draw());
  }
}

abstract class FieldObject {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  x: number;
  y: number;
  src: string;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = this.canvas.width / FIELD_TILE_SIZE_PER_CANVAS;
    this.height = this.canvas.height / FIELD_TILE_SIZE_PER_CANVAS;
    this.x = x;
    this.y = y;
    this.src = GrassImage;
  }

  draw() {
    const img = new Image();
    img.src = this.src;
    img.onload = () => {
      this.ctx.drawImage(
        img,
        this.x,
        this.y,
        this.canvas.width / FIELD_TILE_SIZE_PER_CANVAS,
        this.canvas.height / FIELD_TILE_SIZE_PER_CANVAS,
      );
    };
  }
}

class ItemGrass extends FieldObject {
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    super(canvas, ctx, x, y);
  }
}
