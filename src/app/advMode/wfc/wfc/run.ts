import { createSuperposition } from './superposition';
import { createOverlappingModel } from './overlappingModel';
import { setGround } from './setGround';
import { createObservation } from './observe';
import { propagate } from './propagate';
import { createRender } from './render';

export interface IWfcOptions {
  periodicInput: boolean;
  periodicOutput: boolean;
  outputWidth: number;
  outputHeight: number;
  N: number;
  symmetry: number;
  ground: number;
}

export interface IWaveFunctionCollapse {
  stop(): void;
}

const targetFps = 60;
const targetTime = 1000 / targetFps;

export function createWaveFunctionCollapse(
  image: ImageData,
  canvas: HTMLCanvasElement,
  {
    periodicInput,
    periodicOutput,
    outputWidth,
    outputHeight,
    N,
    symmetry,
    ground,
  }: IWfcOptions,
  placeId: string
): IWaveFunctionCollapse {
  const model = createOverlappingModel(image, { N, symmetry, periodicInput });
  const superpos = createSuperposition(model.numCoefficients, {
    width: outputWidth,
    height: outputHeight,
    periodic: periodicOutput,
  });

  const observe = createObservation(model, superpos, placeId);

  canvas.width = 512;
  canvas.height = 512;
  const tilesize = canvas.width / outputWidth;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const clear = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    superpos.clear();
    setGround(ground, superpos);
  };

  const render = createRender(model, superpos, ctx, tilesize);

  let propagating = false;
  let propagationLoops = 1;
  let animationFrameId: number;

  const tick = () => {
    if (!propagating) {
      const result = observe();
      if (result === null) {
        propagating = true;
      } else if (result === false) {
        clear();
      } else {
        return;
      }
    } else {
      const time = Date.now();
      for (let i = 0; propagating && i < propagationLoops; i++) {
        const waveIndex = propagate(model, superpos);
        if (waveIndex === null) {
          propagating = false;
        } else {
          render(waveIndex);
        }
      }
      if (propagating) {
        const elapsed = Date.now() - time;
        if (elapsed > targetTime) {
          propagationLoops = Math.max(1, propagationLoops - 1);
        } else {
          propagationLoops++;
        }
      }
    }
    animationFrameId = requestAnimationFrame(tick);
  };

  clear();
  tick();

  return {
    stop() {
      cancelAnimationFrame(animationFrameId);
    },
  };
}
