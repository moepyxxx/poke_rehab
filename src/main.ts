import "./style.css";
import heroImg from "./assets/hero.png";
import typescriptLogo from "./assets/typescript.svg";
import viteLogo from "./assets/vite.svg";
import { Field } from "./field.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.ts</code> and save to test <code>HMR</code></p>
  </div>
</section>

<section class="main">
  <canvas id="screen" class="screen" width="300" height="300"></canvas>
</section>

 
`;

const setup = () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#screen");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const field = new Field(canvas, ctx);
  field.draw();
};

setup();
