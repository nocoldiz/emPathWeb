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
