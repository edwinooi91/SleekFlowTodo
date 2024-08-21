import { immerOn } from 'ngrx-immer/store';
import { createFeature, createReducer } from "@ngrx/store";
import { Todo } from "../../models/todo";
import { todoActions } from "../actions/todo.actions";

export interface TodoState {
  todos: Todo[];
  loading: boolean;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
};

export const todoFeature = createFeature({
  name: 'todo',
  reducer: createReducer(
    initialState,
    immerOn(todoActions.getTodoList, (state) => {
      state.loading = true;
    }),
    immerOn(todoActions.getTodoListSuccess, (state, { todos }) => {
      state.loading = false;
      state.todos = todos;
    }),
    immerOn(todoActions.getTodoListFailed, (state) => {
      state.loading = false;
    }),
    immerOn(todoActions.createTodo, (state) => {
      state.loading = true;
    }),
    immerOn(todoActions.createTodoSuccess, (state) => {
      state.loading = false;
    }),
    immerOn(todoActions.createTodoFailed, (state) => {
      state.loading = false;
    }),
    immerOn(todoActions.updateTodo, (state) => {
      state.loading = true;
    }),
    immerOn(todoActions.updateTodoSuccess, (state) => {
      state.loading = false;
    }),
    immerOn(todoActions.updateTodoFailed, (state) => {
      state.loading = false;
    }),
    immerOn(todoActions.deleteTodo, (state) => {
      state.loading = true;
    }),
    immerOn(todoActions.deleteTodoSuccess, (state) => {
      state.loading = false;
    }),
    immerOn(todoActions.deleteTodoFailed, (state) => {
      state.loading = false;
    }),
  )
});
