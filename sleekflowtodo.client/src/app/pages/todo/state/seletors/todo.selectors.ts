import { createFeatureSelector } from "@ngrx/store";
import { TodoState, todoFeature } from "../reducers/todo.reducers";

export const selectTodoFeature = createFeatureSelector<TodoState>(
  todoFeature.name,
);
