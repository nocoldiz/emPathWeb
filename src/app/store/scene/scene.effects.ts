import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { fixedPlaces } from 'src/app/advMode/adventure/adventureModules/varlenia.places';

let places = fixedPlaces;

@Injectable()
export class SceneEffects {
  /*
  @Effect()
  loadMovies$ = this.actions$
    .pipe(
      ofType('[Scene] Load place'),
      mergeMap(() => fixedPlaces
        .pipe(
          map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
          catchError(() => EMPTY)
        ))
      )
    );*/
  constructor(private actions$: Actions) {}
}
