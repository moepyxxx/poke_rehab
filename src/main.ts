import "./style.css";
import { Field } from "./field.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<section class="main">
  <canvas id="screen" class="screen" width="300" height="300"></canvas>
</section>

 
`;

const setup = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#screen");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const field = new Field(canvas, ctx, 0, 0);
  field.draw();
};

setup();
