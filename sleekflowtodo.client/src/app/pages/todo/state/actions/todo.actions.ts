import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Todo } from "../../models/todo";

export const todoActions = createActionGroup({
  source: 'Todo',
  events: {
    'Get Todo List': props<{ filter: string|null, order: string|null }>(),
    'Get Todo List Success': props<{ todos: Todo[] }>(),
    'Get Todo List Failed': props<{ error: unknown }>(),
    'Create Todo': props<{ todo: Todo }>(),
    'Create Todo Success': emptyProps,
    'Create Todo Failed': props<{ error: unknown }>(),
    'Update Todo': props<{ todo: Todo }>(),
    'Update Todo Success': emptyProps,
    'Update Todo Failed': props<{ error: unknown }>(),
    'Delete Todo': props <{ todoId: string}>(),
    'Delete Todo Success': emptyProps,
    'Delete Todo Failed': props<{ error: unknown }>(),
  }
});
