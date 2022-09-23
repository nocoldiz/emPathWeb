// We import not only "Injectable", but "Inject" too, from @angular/core
import { Injectable, Inject } from '@angular/core';
// We import DOCUMENT from @angular/common
import { DOCUMENT } from '@angular/common';
export interface IWfcOptions {
  periodicInput: boolean;
  periodicOutput: boolean;
  outputWidth: number;
  outputHeight: number;
  N: number;
  symmetry: number;
  ground: number;
}
export interface IOverlappingModel {
  readonly numCoefficients: number;
  readonly N: number;
  readonly colors: number[];
  readonly patterns: number[][];
  readonly propagator: number[][][][];
  readonly patternCount: number[];
}
export interface ISuperposition {
  readonly width: number;
  readonly height: number;
  readonly numCoefficients: number;
  readonly wave: boolean[][];
  periodic: boolean;
  change(waveIndex: number): void;
  getChange(): number | null;
  collapse(waveIndex: number, coefficient: number): void;
  setCoefficient(waveIndex: number, coefficient: number, state: boolean): void;
  clear(): void;
}

export interface IWaveFunctionCollapse {
  stop(): void;
}

@Injectable()
export class MapService {
  targetFps = 60;
  groundCtx: CanvasRenderingContext2D;
  eventCtx: CanvasRenderingContext2D;

  cv;
  ev;
  targetTime = 1000 / this.targetFps;
  stop = false;
  sumFunc = (a: any, b: any) => a + b;
  collisionMap = [];

  tileLibrary = {
    //Green
    '#00ff0c': ['🌱', '🥀'],

    //Blue
    '#00d8ff': ['🌊'],
  };

  constructor(@Inject(DOCUMENT) private document: HTMLDocument) {}
  createPlayer(canvas: HTMLCanvasElement) {
    this.eventCtx = this.ev.getContext('2d') as CanvasRenderingContext2D;

    console.log(this.document.body, this.eventCtx);

    this.eventCtx.fillStyle = 'green';
    this.eventCtx.strokeStyle = 'green';
    this.eventCtx.fillRect(0, 0, canvas.width, canvas.height);
    this.eventCtx.fillText('🏖️', 16, 16, 16);
  }
  movePlayer(canvas: HTMLCanvasElement, x: number, y: number) {
    this.ev = canvas;

    this.eventCtx = this.ev.getContext('2d') as CanvasRenderingContext2D;

    console.log(this.document.body, this.eventCtx);

    this.eventCtx.fillStyle = 'green';
    this.eventCtx.strokeStyle = 'green';
    // this.eventCtx.fillRect(0, 0, canvas.width, canvas.height);
    this.eventCtx.fillText('🏖️', x, y, 16);
  }

  getCollisionMap() {
    return this.collisionMap;
  }

  createImage(canvas: HTMLCanvasElement) {
    this.cv = canvas;

    console.log('the canvas:' + this.cv);
    console.log(this.cv);
    this.groundCtx = this.cv.getContext('2d') as CanvasRenderingContext2D;

    console.log(this.document.body, this.groundCtx);

    this.groundCtx.fillStyle = 'green';
    this.groundCtx.strokeStyle = 'black';
    this.groundCtx.fillRect(10, 5, 200, 50);
    this.groundCtx.fillStyle = 'yellow';
    this.groundCtx.fillRect(60, 35, 100, 40);
    return this.groundCtx.canvas.toDataURL();
  }
  clear(): void {
    this.groundCtx.fillStyle = '#000';
    this.groundCtx.fillRect(0, 0, this.cv.width, this.cv.height);
    this.stop = true;
  }
  setGround(
    ground = 0,
    {
      wave,
      width,
      height,
      numCoefficients,
      setCoefficient,
      collapse,
    }: ISuperposition
  ): void {
    if (ground === 0) {
      return;
    }

    ground = (ground + numCoefficients) % numCoefficients;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height - 1; y++) {
        setCoefficient(x + y * width, ground, false);
      }
      collapse(x + (height - 1) * width, ground);
    }
  }

  createSuperposition(
    numCoefficients: number,
    { width = 48, height = 48, periodic = true } = {}
  ): ISuperposition {
    const wave: boolean[][] = [];
    const changes: boolean[] = [];

    for (let i = 0; i < width * height; i++) {
      const w: boolean[] = [];

      for (let t = 0; t < numCoefficients; t++) {
        w.push(true);
      }

      wave.push(w);
      changes.push(false);
    }

    const stack: number[] = [];
    let stacksize = 0;

    const superposition = {
      width,
      height,
      numCoefficients,
      wave,
      periodic,
      change(i: number) {
        if (changes[i]) {
          return;
        }
        stack[stacksize] = i;
        stacksize++;
        changes[i] = true;
      },
      getChange() {
        if (stacksize === 0) {
          return null;
        }
        const i = stack[stacksize - 1];
        stacksize--;
        changes[i] = false;
        return i;
      },
      collapse(i: number, coefficient: number) {
        for (let t = 0; t < numCoefficients; t++) {
          wave[i][t] = t === coefficient;
        }
        superposition.change(i);
      },
      setCoefficient(i: number, coefficient: number, state: boolean) {
        wave[i][coefficient] = state;
        superposition.change(i);
      },
      clear() {
        for (const w of wave) {
          w.fill(true);
        }
      },
    };

    return superposition;
  }

  createWaveFunctionCollapse(
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
    placeId: string,
    map: string[][]
  ): IWaveFunctionCollapse {
    const model = this.createOverlappingModel(image, {
      N,
      symmetry,
      periodicInput,
    });
    const superpos = this.createSuperposition(model.numCoefficients, {
      width: outputWidth,
      height: outputHeight,
      periodic: periodicOutput,
    });

    const observe = this.createObservation(model, superpos, placeId, map);

    canvas.width = 512;
    canvas.height = 512;
    const tilesize = canvas.width / outputWidth;

    const groundCtx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const clear = () => {
      groundCtx.fillStyle = '#000';
      groundCtx.fillRect(0, 0, canvas.width, canvas.height);
      superpos.clear();
      this.setGround(ground, superpos);
    };

    const render = this.createRender(model, superpos, groundCtx, tilesize);

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
          const waveIndex = this.propagate(model, superpos);
          if (waveIndex === null) {
            propagating = false;
          } else {
            render(waveIndex);
          }
        }
        if (propagating) {
          const elapsed = Date.now() - time;
          if (elapsed > this.targetTime) {
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

  orderedArraySum(array: number[]): number[] {
    const sorted = array.slice().sort((a, b) => b - a);
    const sum = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      sum[i] = sum[i - 1] + sorted[i];
    }
    return sum;
  }

  drawPixelFromColor(
    groundCtx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: number,
    tilesize: number
  ) {
    groundCtx.textAlign = 'center';
    groundCtx.fillStyle = `rgb(${color & 255},${(color >> 8) & 255},${
      (color >> 16) & 255
    })`;
    //console.log('#map', x, y, groundCtx.fillStyle);
    if (groundCtx.fillStyle === `#000f01`) {
      this.collisionMap.push([x, y]);
      console.log(this.collisionMap);
    }
    //TODO: add different probabilities, ex: fertility stat for drawing flowers
    if (Math.random() > 0.8) {
      //Draw emoji

      if (groundCtx.fillStyle in this.tileLibrary) {
        groundCtx.fillText(
          this.tileLibrary[groundCtx.fillStyle][
            Math.floor(
              Math.random() * this.tileLibrary[groundCtx.fillStyle].length
            )
          ],
          x * tilesize,
          y * tilesize,
          tilesize
        );
      }
    }

    groundCtx.fillRect(x * tilesize, y * tilesize, tilesize, tilesize);
    // groundCtx.fillText('🏖️', x * TILESIZE, y * TILESIZE, TILESIZE);
  }

  createRender(
    { colors, patterns, patternCount, N }: IOverlappingModel,
    { wave, width, height, periodic }: ISuperposition,
    groundCtx: CanvasRenderingContext2D,
    tilesize: number
  ) {
    const maxPatternCount = this.orderedArraySum(patternCount);

    return (waveIndex: number): void => {
      const w = wave[waveIndex];

      let activeCoefficients = 0;
      let sum = 0;
      let lastPatternIndex = 0;

      const angleConstant = (2 * Math.PI) / w.length;
      let hueX = 0;
      let hueY = 0;

      for (let i = 0; i < w.length; i++) {
        if (w[i]) {
          activeCoefficients++;
          sum += patternCount[i];
          lastPatternIndex = i;
          hueX += Math.cos(angleConstant * i);
          hueY += Math.sin(angleConstant * i);
        }
      }

      const x = waveIndex % width;
      const y = Math.floor(waveIndex / width);

      if (activeCoefficients === 1) {
        const pattern = patterns[lastPatternIndex];
        if (!periodic && (x >= width - N || y >= height - N)) {
          for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
              this.drawPixelFromColor(
                groundCtx,
                x + i,
                y + j,
                colors[pattern[i + j * N]],
                tilesize
              );
            }
          }
        } else {
          this.drawPixelFromColor(
            groundCtx,
            x,
            y,
            colors[pattern[0]],
            tilesize
          );
        }
      } else {
        // circular average of active coefficients
        const hue = (180 * (Math.PI + Math.atan2(hueY, hueX))) / Math.PI;

        const saturation = 1 * (sum / maxPatternCount[activeCoefficients]);
        const lightness = Math.round(80 - (80 * activeCoefficients) / w.length);
        groundCtx.fillStyle = `hsl(${hue},${saturation}%,${lightness}%)`;

        groundCtx.fillRect(x * tilesize, y * tilesize, tilesize, tilesize);
        //groundCtx.fillText('⛸', x * tilesize, y * tilesize, tilesize);
      }
    };
  }

  propagate(
    { N, propagator }: IOverlappingModel,
    {
      wave,
      width,
      height,
      numCoefficients,
      periodic,
      setCoefficient,
      getChange,
    }: ISuperposition
  ): number | null {
    const i1 = getChange();
    if (i1 === null) {
      return null;
    }

    const w1 = wave[i1];
    const x1 = i1 % width;
    const y1 = Math.floor(i1 / width);

    for (let dx = -N + 1; dx < N; dx++) {
      for (let dy = -N + 1; dy < N; dy++) {
        if (this.stop) return;

        let x2 = x1 + dx;
        if (x2 < 0) {
          x2 += width;
        } else if (x2 >= width) {
          x2 -= width;
        }

        let y2 = y1 + dy;
        if (y2 < 0) {
          y2 += height;
        } else if (y2 >= height) {
          y2 -= height;
        }

        const i2 = x2 + y2 * width;

        if (
          !periodic &&
          ((i2 % width) + N > width || Math.floor(i2 / width) + N > height)
        ) {
          continue;
        }

        const w2 = wave[i2];
        const prop = propagator[N - 1 - dx][N - 1 - dy];

        for (let t = 0; t < numCoefficients; t++) {
          if (this.stop) return;

          if (!w2[t]) {
            continue;
          }
          let b = false;
          const p = prop[t];
          for (let l = 0; !b && l < p.length; l++) {
            if (this.stop) return;

            b = w1[p[l]];
          }
          if (!b) {
            setCoefficient(i2, t, false);
          }
        }
      }
    }

    return i1;
  }

  pickFromDistribution(array: number[], r: number): number {
    let sum = array.reduce(this.sumFunc);

    if (sum === 0) {
      array.fill(1);
      sum = array.reduce(this.sumFunc);
    }

    for (let i = 0; i < array.length; i++) {
      if (this.stop) return;

      array[i] /= sum;
    }

    let x = 0;
    for (let i = 0; i < array.length; i++) {
      if (this.stop) return;

      x += array[i];
      if (r <= x) {
        return i;
      }
    }

    return 0;
  }
  createObservation(
    { patternCount, N }: IOverlappingModel,
    {
      wave,
      width,
      height,
      numCoefficients,
      periodic,
      collapse,
    }: ISuperposition,
    placeId: string,
    map: any
  ) {
    const logT = Math.log(numCoefficients);
    const distribution: number[] = [];

    return (): boolean | null => {
      let minEntropy = Infinity;
      let minEntropyWave = -1;

      for (let i = 0; i < wave.length; i++) {
        if (
          !periodic &&
          ((i % width) + N > width || Math.floor(i / width) + N > height)
        ) {
          continue;
        }

        const w = wave[i];
        let amount = 0;
        let sum = 0;

        for (let t = 0; t < numCoefficients; t++) {
          if (w[t]) {
            amount += 1;
            sum += patternCount[t];
          }
        }

        if (sum === 0) {
          return false;
        }

        const noise = 1e-6 * Math.random();

        let entropy;
        if (amount === 1) {
          entropy = 0;
        } else {
          let mainSum = 0;
          for (let t = 0; t < numCoefficients; t++) {
            if (w[t]) {
              const p = patternCount[t] / sum;
              mainSum += p * Math.log(p);
            }
          }

          entropy = -mainSum / logT;
        }

        if (entropy > 0 && entropy + noise < minEntropy) {
          minEntropy = entropy + noise;
          minEntropyWave = i;
        }
      }

      if (minEntropyWave === -1) {
        return true;
      }

      for (let t = 0; t < numCoefficients; t++) {
        distribution[t] = wave[minEntropyWave][t] ? patternCount[t] : 0;
      }
      const r = this.pickFromDistribution(distribution, Math.random());

      collapse(minEntropyWave, r);

      return null;
    };
  }

  createOverlappingModel(
    { width, height, data }: ImageData,
    { N = 3, periodicInput = true, symmetry = 8 } = {}
  ): IOverlappingModel {
    const bitmap = new Uint32Array(data.buffer);

    const colors: number[] = [];
    const sample: number[] = [];

    for (const color of bitmap) {
      let i = 0;
      for (const c of colors) {
        if (c === color) {
          break;
        }
        i++;
      }
      if (i === colors.length) {
        colors.push(color);
      }
      sample.push(i);
    }

    const pattern = (f: (x: number, y: number) => number) => {
      const result = [];
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
          result.push(f(x, y));
        }
      }
      return result;
    };

    const patternFromSample = (x: number, y: number) => {
      return pattern(
        (dx, dy) => sample[((x + dx) % width) + ((y + dy) % height) * width]
      );
    };
    const rotate = (p: number[]) => pattern((x, y) => p[N - 1 - y + x * N]);
    const reflect = (p: number[]) => pattern((x, y) => p[N - 1 - x + y * N]);

    const C = colors.length;
    const W = C ** (N * N);

    const index = (p: number[]) => {
      let result = 0;
      let power = 1;

      for (let i = 0; i < p.length; i++) {
        result += p[p.length - 1 - i] * power;
        power *= C;
      }

      return result;
    };

    const patternFromIndex = (ind: number) => {
      let residue = ind;
      let power = W;
      const result: number[] = [];

      for (let i = 0; i < N * N; i++) {
        power /= C;
        let count = 0;

        while (residue >= power) {
          residue -= power;
          count++;
        }

        result.push(count);
      }

      return result;
    };

    const weights = new Map<number, number>();

    const lenY = periodicInput ? height : height - N + 1;
    const lenX = periodicInput ? width : width - N + 1;
    for (let y = 0; y < lenY; y++) {
      for (let x = 0; x < lenX; x++) {
        const ps: number[][] = [];

        ps[0] = patternFromSample(x, y);
        ps[1] = reflect(ps[0]);
        ps[2] = rotate(ps[0]);
        ps[3] = reflect(ps[2]);
        ps[4] = rotate(ps[2]);
        ps[5] = reflect(ps[4]);
        ps[6] = rotate(ps[4]);
        ps[7] = reflect(ps[6]);

        for (let k = 0; k < symmetry; k++) {
          const ind = index(ps[k]);
          const weight = weights.get(ind) || 0;
          weights.set(ind, weight + 1);
        }
      }
    }

    const numCoefficients = weights.size;
    const patterns: number[][] = [];
    const patternCount: number[] = [];

    for (const [ind, weight] of weights) {
      patterns.push(patternFromIndex(ind));
      patternCount.push(weight);
    }

    const agrees = (
      pattern1: number[],
      pattern2: number[],
      dx: number,
      dy: number
    ) => {
      const xmin = dx < 0 ? 0 : dx;
      const xmax = dx < 0 ? dx + N : N;
      const ymin = dy < 0 ? 0 : dy;
      const ymax = dy < 0 ? dy + N : N;
      for (let y = ymin; y < ymax; y++) {
        for (let x = xmin; x < xmax; x++) {
          if (pattern1[x + N * y] !== pattern2[x - dx + N * (y - dy)]) {
            return false;
          }
        }
      }
      return true;
    };

    const propagator: number[][][][] = [];
    for (let x = 0; x < 2 * N - 1; x++) {
      propagator[x] = [];
      for (let y = 0; y < 2 * N - 1; y++) {
        propagator[x][y] = [];
        for (let t = 0; t < numCoefficients; t++) {
          propagator[x][y][t] = [];
          for (let t2 = 0; t2 < numCoefficients; t2++) {
            if (agrees(patterns[t], patterns[t2], x - N + 1, y - N + 1)) {
              propagator[x][y][t].push(t2);
            }
          }
        }
      }
    }

    return {
      numCoefficients,
      colors,
      N,
      patterns,
      propagator,
      patternCount,
    };
  }
}
