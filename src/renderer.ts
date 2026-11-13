import { VISIBLE_FIELD_TILE_SIZE_PER_CANVAS } from "./constants/field_tile";
import type { Field, FieldObject } from "./field";
import type { Hero } from "./human";

export class Renderer {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  animationSpeed: number = 50;
  animationStartTime: number | null = null;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  init() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawField(field: Field, timestamp: number) {
    const visibleObjects = [];
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
        visibleObjects.push(
          ...field.objects.filter(
            (obj) => obj.xPoint === xi && obj.yPoint === yi,
          ),
        );
      }
    }

    if (field.change === null) {
      this.drawStaticField(field, visibleObjects);

      field.markChangeAsDone();
      this.animationStartTime = null;
      return;
    }

    // 以下一旦rightだった場合で考える
    // TODO: 他向きの場合も考える

    if (field.change && this.animationStartTime === null) {
      this.animationStartTime = timestamp;
    }

    if (this.animationStartTime === null) {
      throw Error("コードおかしい");
    }

    const elapsed = timestamp - this.animationStartTime;
    const progress = elapsed / this.animationSpeed / 100;

    if (progress > 1) {
      this.animationStartTime = null;
      field.markChangeAsDone();
      this.drawStaticField(field, visibleObjects);
      return;
    }
    const added = [];
    for (
      let yi = field.yPoint;
      yi < field.yPoint + VISIBLE_FIELD_TILE_SIZE_PER_CANVAS;
      yi++
    ) {
      added.push(
        ...field.objects.filter(
          (obj) => obj.xPoint === field.xPoint - 1 && obj.yPoint === yi,
        ),
      );
    }

    visibleObjects.push(...added);

    this.ctx.save();
    this.ctx.translate(
      (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS) * (1 - progress),
      0,
    );
    visibleObjects.forEach((obj) => {
      const x =
        obj.xPoint * (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);
      const y =
        obj.yPoint * (this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);

      this.ctx.drawImage(
        obj.image,
        x - this.calculateXPosition(field.xPoint),
        y - this.calculateYPosition(field.yPoint),
        this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
        this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
      );
    });

    this.ctx.restore();
  }

  private drawStaticField(field: Field, objects: FieldObject[]) {
    objects.forEach((obj) => {
      this.drawFieldObject(
        obj,
        this.calculateXPosition(field.xPoint),
        this.calculateYPosition(field.yPoint),
      );
    });
  }

  drawHero(hero: Hero) {
    let img;
    switch (hero.direction) {
      case "above":
        img = hero.aboveImage;
        break;
      case "below":
        img = hero.belowImage;
        break;
      case "left":
        img = hero.leftImage;
        break;
      case "right":
        img = hero.rightImage;
        break;
    }

    this.ctx.drawImage(
      img,
      (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS) * 2,
      (this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS) * 2,
      this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
      this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
    );
  }

  private drawFieldObject(
    fieldObject: FieldObject,
    offsetX?: number,
    offsetY?: number,
  ) {
    const x =
      fieldObject.xPoint *
      (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);
    const y =
      fieldObject.yPoint *
      (this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS);

    this.ctx.drawImage(
      fieldObject.image,
      offsetX ? x - offsetX : x,
      offsetY ? y - offsetY : y,
      this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
      this.canvas.height / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS,
    );
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
