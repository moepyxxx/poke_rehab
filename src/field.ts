const FIELD_TILE_SIZE_PER_CANVAS = 10;

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
          new Grass(
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
    this.ctx.fillStyle = "rgba(145,153,125, 1)";
    this.ctx.fillRect(10, 10, 10, 10);
  }
}

// const canvas: HTMLCanvasElement | null = document.getElementById("canvas");
// if (!canvas) return;
// const ctx = canvas.getContext("2d");

abstract class FieldObject {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  x: number;
  y: number;

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
  }

  abstract draw(): void;
}

class Grass extends FieldObject {
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    super(canvas, ctx, x, y);
  }
  draw() {}
}
