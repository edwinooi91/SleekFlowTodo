import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from "../models/todo";

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private client: HttpClient) { }

  get(filter: string | null, order: string | null) {
    const queryParams = [];

    if (filter) {
      queryParams.push(`filter=${filter}`);
    }
    if (order) {
      queryParams.push(`order=${order}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    return this.client.get<Todo[]>(`api/todo/get${queryString}`);
  }

  create(todo: Todo) {
    return this.client.post('api/todo/create', todo);
  }

  update(todo: Todo) {
    return this.client.put('api/todo/update', todo);
  }

  delete(todoId: string) {
    return this.client.delete('api/todo/' + todoId);
  }
}
