import { create, all, type EvalFunction } from "mathjs";
import type { ComputeParams } from "../../types";

console.log(`Hello from worker!`);

const math = create(all, {});

const floor = (x: number) => Math.floor(x);
const ceil = (x: number) => Math.ceil(x);
const sqrt = (x: number) => Math.sqrt(x);
const ln = (x: number) => Math.log(x);

self.onmessage = (message: MessageEvent<ComputeParams>) => {
  const { left, right, showGradients, highlightLucky } = message.data;
  console.log(message.data);
  let codeLeft: EvalFunction;
  let codeRight: EvalFunction;
  try {
    codeLeft = math.compile(left);
  } catch (error) {
    console.log(error)
    postMessage({
      message: "error",
      error: `Error in left formula: ${(error as any).message}`,
    });
    return;
  }
  try {
    codeRight = math.compile(right);
  } catch (error) {
    console.log(error)
    postMessage({
      message: "error",
      error: `Error in right formula: ${(error as any).message}`,
    });
    return;
  }

  let lucky = 0;
  const width = 1000;
  const height = 1000;

  const result = new Uint8Array(width * height * 4);

  function setPixel(x: number, y: number, value: number) {
    const offset = (x + y * width) * 4;
    result[offset] = value;
    if (highlightLucky) {
      result[offset + 1] = value === 255 ? 0 : value;
      result[offset + 2] = value === 255 ? 0 : value;
    } else {
      result[offset + 1] = value;
      result[offset + 2] = value;
    }
    result[offset + 3] = 255;
  }

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const scope = {
        a: (i / 100) | 0,
        b: ((i % 100) / 10) | 0,
        c: i % 10,
        x: (j / 100) | 0,
        y: ((j % 100) / 10) | 0,
        z: j % 10,
        l: i,
        r: j,
        floor,
        ceil,
        sqrt,
        ln,
      };
      const l = codeLeft.evaluate(scope);
      const r = codeRight.evaluate(scope);
      const diff = Math.abs(l - r);
      if (diff < 1e-7) {
        lucky++;
      }
      if (showGradients) {
        const shade = 255 / (diff + 1);
        setPixel(i, j, shade);
      } else {
        setPixel(i, j, diff < 1e-7 ? 255 : 0);
      }
    }
    postMessage({
      message: "progress",
      progress: i / 10,
    });
  }

  console.log(`Done ${left} = ${right}`);

  postMessage({
    message: "result",
    lucky,
    result,
  });
};

export {}