const ALL_FIELD_TILE_SIZE_PER_CANVAS = 9;
const VISIBLE_FIELD_TILE_SIZE_PER_CANVAS = 5;

export class Field {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  objects: FieldObject[];
  startX: number;
  startY: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    startXPoint: number,
    startYPoint: number,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.objects = this.createObjects();
    this.startX =
      startXPoint * (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);
    this.startY =
      startYPoint * (this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);
  }

  createObjects() {
    const objects: FieldObject[] = [];
    for (let xi = 0; xi < ALL_FIELD_TILE_SIZE_PER_CANVAS; xi++) {
      for (let yi = 0; yi < ALL_FIELD_TILE_SIZE_PER_CANVAS; yi++) {
        if (
          xi === 0 ||
          yi === 0 ||
          xi === ALL_FIELD_TILE_SIZE_PER_CANVAS - 1 ||
          yi === ALL_FIELD_TILE_SIZE_PER_CANVAS - 1
        ) {
          objects.push(
            new BaseBlack(
              this.canvas,
              this.ctx,
              xi * (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS),
              yi * (this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS),
            ),
          );
          continue;
        }
        objects.push(
          new BaseGrass(
            this.canvas,
            this.ctx,
            xi * (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS),
            yi * (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS),
          ),
        );
        objects.push(
          new ItemGrass(
            this.canvas,
            this.ctx,
            xi * (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS),
            yi * (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS),
          ),
        );
      }
    }
    return objects;
  }

  draw() {
    for (let xi = 0; xi < VISIBLE_FIELD_TILE_SIZE_PER_CANVAS; xi++) {
      for (let yi = 0; yi < VISIBLE_FIELD_TILE_SIZE_PER_CANVAS; yi++) {
        const targetX =
          this.startX +
          xi * (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);
        const targetY =
          this.startY +
          yi * (this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);

        this.objects
          .filter((obj) => obj.x === targetX && obj.y === targetY)
          .forEach((obj) => obj.draw(this.startX, this.startY));
      }
    }
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
    src: string,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS;
    this.height = this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS;
    this.x = x;
    this.y = y;
    this.src = src;
  }

  draw(offsetX?: number, offsetY?: number) {
    const img = new Image();
    img.src = this.src;

    img.onload = () => {
      this.ctx.drawImage(
        img,
        offsetX ? this.x - offsetX : this.x,
        offsetY ? this.y - offsetY : this.y,
        this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
        this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
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
    super(canvas, ctx, x, y, "./src/assets/item_grass.svg");
  }
}

class BaseBlack extends FieldObject {
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    super(canvas, ctx, x, y, "./src/assets/base_black.svg");
  }
}

class BaseGrass extends FieldObject {
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    super(canvas, ctx, x, y, "./src/assets/base_grass.svg");
  }
}
