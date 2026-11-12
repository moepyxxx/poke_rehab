import { VISIBLE_FIELD_TILE_SIZE_PER_CANVAS } from "./constants/field_tile";
import type { Field, FieldObject } from "./field";
import type { Hero } from "./human";

export class Renderer {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  drawField(field: Field) {
    const filtered = [];
    for (
      let xi = field.xPoint;
      xi < field.xPoint + VISIBLE_FIELD_TILE_SIZE_PER_CANVAS;
      xi++
    ) {
      for (
        let yi = field.yPoint;
        yi < field.yPoint + VISIBLE_FIELD_TILE_SIZE_PER_CANVAS;
        yi++
      ) {
        filtered.push(
          ...field.objects.filter(
            (obj) => obj.xPoint === xi && obj.yPoint === yi,
          ),
        );
      }
    }

    filtered.forEach((obj) => {
      this.drawFieldObject(
        obj,
        this.calculateXPosition(field.xPoint),
        this.calculateYPosition(field.yPoint),
      );
    });
  }

  drawHero(hero: Hero) {
    const img = new Image();
    switch (hero.direction) {
      case "above":
        img.src = hero.aboveSrc;
        break;
      case "below":
        img.src = hero.belowSrc;
        break;
      case "left":
        img.src = hero.leftSrc;
        break;
      case "right":
        img.src = hero.rightSrc;
        break;
    }

    img.onload = () => {
      this.ctx.drawImage(
        img,
        (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS) * 2,
        (this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS) * 2,
        this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
        this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
      );
    };
  }

  private drawFieldObject(
    fieldObject: FieldObject,
    offsetX?: number,
    offsetY?: number,
  ) {
    const img = new Image();
    img.src = fieldObject.src;

    const x =
      fieldObject.xPoint *
      (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);
    const y =
      fieldObject.yPoint *
      (this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);
    img.onload = () => {
      this.ctx.drawImage(
        img,
        offsetX ? x - offsetX : x,
        offsetY ? y - offsetY : y,
        this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
        this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
      );
    };
  }

  private calculateXPosition(xPosition: number) {
    return xPosition * (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);
  }

  private calculateYPosition(yPosition: number) {
    return (
      yPosition * (this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS)
    );
  }
}
