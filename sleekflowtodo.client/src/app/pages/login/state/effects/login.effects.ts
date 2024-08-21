import { Injectable } from "@angular/core";
import { todoActions } from "../actions/todo.actions";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "../../services/todo.service";

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) { }

  getTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.getTodoList),
      mergeMap(() =>
        this.todoService.get().pipe(
          map(todos =>
            todoActions.getTodoListSuccess({ todos })),
          catchError((error) => of(todoActions.getTodoListFailed(error))),
        ),
      ),
    ),
    { functional: true },
  );
}
