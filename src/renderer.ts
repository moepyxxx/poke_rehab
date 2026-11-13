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
      this.drawFieldObjects(field, visibleObjects);

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
      this.drawFieldWithoutAnimation(field, visibleObjects);
      return;
    }

    this.drawFieldWithAnimation(field, visibleObjects, progress);
  }

  private drawFieldWithoutAnimation(field: Field, fieldObjects: FieldObject[]) {
    this.animationStartTime = null;
    field.markChangeAsDone();
    this.ctx.save();
    this.drawFieldObjects(field, fieldObjects);
    this.ctx.restore();
  }

  private drawFieldWithAnimation(
    field: Field,
    fieldObjects: FieldObject[],
    progress: number,
  ) {
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

    const objects = [...fieldObjects, ...added];

    this.ctx.save();
    this.ctx.translate(
      (this.canvas.width / VISIBLE_FIELD_TILE_SIZE_PER_CANVAS) * (1 - progress),
      0,
    );
    this.drawFieldObjects(field, objects);
    this.ctx.restore();
  }

  private drawFieldObjects(field: Field, objects: FieldObject[]) {
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
