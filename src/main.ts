import "./style.css";
import { Field } from "./field.ts";
import { Controller } from "./controller.ts";
import { Renderer } from "./renderer.ts";
import { Hero } from "./human.ts";

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
  const renderer = new Renderer(canvas, ctx);
  const controller = new Controller();

  const field = new Field(0, 0);
  const hero = new Hero(
    "./src/assets/human/hero/above.svg",
    "./src/assets/human/hero/below.svg",
    "./src/assets/human/hero/left.svg",
    "./src/assets/human/hero/right.svg",
    "below",
  );

  let startTime: number | null = null;
  const loop = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    if (elapsed >= INTERVAL) {
      if (controller.controllerEvent) {
        if (hero.checkHeroEvent(controller.controllerEvent)) {
          controller.markEventAsDone();
        } else {
          field.checkFieldEvent(controller.controllerEvent);
          controller.markEventAsDone();
        }
      }
      renderer.init();
      renderer.drawField(field, timestamp);
      renderer.drawHero(hero);
      startTime = timestamp;
    }
    requestAnimationFrame(loop);
  };
  // 画像ロードを待つため
  setTimeout(() => requestAnimationFrame(loop), 1000);
};

setup();
