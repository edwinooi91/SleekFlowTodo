import { Injectable } from "@angular/core";
import { todoActions } from "../actions/todo.actions";
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
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
      mergeMap((action) =>
        this.todoService.get(action.filter, action.order).pipe(
          map(todos =>
            todoActions.getTodoListSuccess({ todos })),
          catchError((error) => of(todoActions.getTodoListFailed(error))),
        ),
      ),
    ),
    { functional: true },
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.createTodo),
      switchMap((action) => 
        this.todoService.create(action.todo).pipe(
          mergeMap(() => [
            todoActions.createTodoSuccess(),
            todoActions.getTodoList({ filter: null, order: null }),
          ]),
          catchError((error) => of(todoActions.createTodoFailed(error))),
        ),
      ),
    ),
    { functional: true },
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.updateTodo),
      switchMap((action) =>
        this.todoService.update(action.todo).pipe(
          mergeMap(() => [
            todoActions.updateTodoSuccess(),
            todoActions.getTodoList({ filter: null, order: null }),
          ]),
          catchError((error) => of(todoActions.updateTodoFailed(error))),
        ),
      ),
    ),
    { functional: true },
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.deleteTodo),
      switchMap((action) =>
        this.todoService.delete(action.todoId).pipe(
          mergeMap(() => [
            todoActions.deleteTodoSuccess(),
            todoActions.getTodoList({ filter: null, order: null }),
          ]),
          catchError((error) => of(todoActions.deleteTodoFailed(error))),
        ),
      ),
    ),
    { functional: true },
  );

}
