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
  doAction$ = this.actions$.pipe(
    ofType('[Scene] Load place'),
    mergeMap(() =>
      this.actionserv.getCustomers().pipe(
        // return a Success action when the HTTP request was successfull (`[Customers Api] Load Sucess`)
        map((customers) => CustomerApiActions.loadCustomersSuccess(customers)),
        // return a Failed action when something went wrong during the HTTP request (`[Customers Api] Load Failed`)
        catchError((error) => of(CustomerApiActions.loadCustomersFailed(error)))
      )
    )
  );*/
  constructor(private actions$: Actions) {}
}
