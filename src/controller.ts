type Mode = "talk" | "expedition";
type ExpeditionCommand = "left" | "right" | "above" | "below";
type TalkCommand = "next";
export type ControllerEvent =
  | {
      mode: "talk";
      command: TalkCommand;
    }
  | {
      mode: "expedition";
      command: ExpeditionCommand;
    };

const KEYS = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"] as const;

export class Controller {
  private mode: Mode;
  controllerEvent: null | ControllerEvent;

  constructor() {
    this.mode = "expedition";
    this.controllerEvent = null;
    this.init();
  }

  init() {
    addEventListener("keydown", (e) => {
      if (!isAllowedKey(e.key)) return;

      this.checkController(e.key);
    });
  }

  markEventAsDone() {
    this.controllerEvent = null;
  }

  checkController(key: (typeof KEYS)[number]) {
    if (this.mode === "expedition") {
      switch (key) {
        case "ArrowDown":
          this.controllerEvent = {
            mode: "expedition",
            command: "below",
          };
          return;
        case "ArrowUp":
          this.controllerEvent = {
            mode: "expedition",
            command: "above",
          };
          return;
        case "ArrowLeft":
          this.controllerEvent = {
            mode: "expedition",
            command: "left",
          };
          return;
        case "ArrowRight":
          this.controllerEvent = {
            mode: "expedition",
            command: "right",
          };
          return;
      }
    }
    this.controllerEvent = {
      mode: "talk",
      command: "next",
    };
  }
}

function isAllowedKey(key: string): key is (typeof KEYS)[number] {
  return (KEYS as readonly string[]).includes(key);
}
