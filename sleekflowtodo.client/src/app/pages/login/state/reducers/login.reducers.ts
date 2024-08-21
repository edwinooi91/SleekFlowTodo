import { immerOn } from 'ngrx-immer/store';
import { createFeature, createReducer } from "@ngrx/store";
import { Todo } from "../../models/todo";
import { todoActions } from "../actions/todo.actions";

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: []
};

export const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    initialState,
    immerOn(todoActions.getTodoListSuccess, (state, { todos }) => {
      state.todos = todos;
    }),
  )
});
