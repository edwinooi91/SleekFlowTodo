import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Todo } from "../../models/todo";

export const todoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Get Todo List': emptyProps,
    'Get Todo List Success': props<{ todos: Todo[] }>(),
    'Get Todo List Failed': props<{ error: unknown }>(),
    'Create Todo List': props<{ todo: Todo }>(),
    'Create Todo List Success': emptyProps,
    'Create Todo List Failed': props<{ error: unknown }>(),
    'Update Todo List': props<{ todos: Todo }>(),
    'Update Todo List Success': emptyProps,
    'Update Todo List Failed': props<{ error: unknown }>(),
    'Delete Todo List': props<{ id: string }>,
    'Delete Todo List Success': emptyProps,
    'Delete Todo List Failed': props<{ error: unknown }>(),
  }
});
