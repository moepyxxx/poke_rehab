import "./style.css";
import { Field } from "./field.ts";
import { Controller } from "./controller.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<section class="main">
  <canvas id="screen" class="screen" width="300" height="300"></canvas>
</section>

 
`;

const INTERVAL = 500;

const setup = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#screen");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const field = new Field(canvas, ctx, 0, 2);
  const controller = new Controller();

  let startTime: number | null = null;
  const loop = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    if (elapsed >= INTERVAL) {
      if (controller.controllerEvent) {
        field.checkFieldEvent(controller.controllerEvent);
        controller.markEventAsDone();
      }
      field.draw();
      startTime = timestamp;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
};

setup();
