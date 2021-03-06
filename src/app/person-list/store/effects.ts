import { Injectable } from '@angular/core';
import { Actions, createEffect,ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as actions from './actions';
import { PersonListService } from './service';

@Injectable()
export class PersonListEffects  {

  constructor(
    private _actions$: Actions,
    private _service: PersonListService
  ) { }

  $addPerson = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.addPerson),
      switchMap((action) => this._service.addPerson(action.person)
        .pipe(
          map((response) => actions.addPersonSuccess({ identifier: action.identifier, response })),
          catchError((error: Error) => of(actions.addPersonFail({ identifier: action.identifier, error })))
        )
      )
    );
  });

  $addPersonSuccess = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.addPersonSuccess),
      tap(() => alert('save success'))
    );
  }, { dispatch: false });

  $removePerson = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.removePerson),
      switchMap((action) => this._service.removePerson(action.person)
        .pipe(
          map((removedPersonId) => actions.removePersonSuccess({ identifier: action.identifier, removedPersonId })),
          catchError((error: Error) => of(actions.removePersonFail({ identifier: action.identifier, error })))
        )
      )
    );
  });

  $removePersonSuccess = createEffect(() => {
    return this._actions$.pipe(
      ofType(actions.removePersonSuccess),
      tap(() => alert('remove success'))
    );
  }, { dispatch: false });

}
