import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

@Injectable()
export class SceneEffects {
  constructor(private actions$: Actions) {}
}
