import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AsyncPipe, DatePipe, NgFor, NgIf, formatDate } from '@angular/common';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Status, StatusEnum, Todo } from "../models/todo";
import { Store } from "@ngrx/store";
import { todoFeature } from "../state/reducers/todo.reducers";
import { todoActions } from "../state/actions/todo.actions";
import { v4 as uuidv4 } from 'uuid';
import { selectTodoFeature } from "../state/seletors/todo.selectors";

const defaultForm = {
  id: '',
  name: '',
  description: '',
  status: Status.NotStarted,
  dueDate: new Date(),
};

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodoComponent implements OnInit {
  dataSource = new BehaviorSubject<Todo[]>([]);
  dataSource$ = this.store.select(todoFeature.selectTodos);

  isAdd = new BehaviorSubject<boolean>(false);

  filter: string = "";
  order: string = "";
  statusEnum: StatusEnum[] = [];

  formGroup = new FormGroup<{
    id?: FormControl<string | null>,
    name: FormControl<string | null>,
    description?: FormControl<string | null>,
    status: FormControl<number | null>,
    dueDate: FormControl<Date | null>,
  }>({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    status: new FormControl<number>(0),
    dueDate: new FormControl<Date>(new Date(), [Validators.required]),
  });

  loading$: Observable<boolean> = this.store.select(selectTodoFeature).pipe(
    map((state) => state.loading)
  );

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(todoActions.getTodoList({ filter: null, order: null }));
    this.store.select(todoFeature.selectTodos)
      .subscribe((todos) => {
        this.dataSource.next(todos);
      });
    this.statusEnum = StatusEnum.GetStatusEnum();
  }

  getStatusLabel(status: Status): string {
    switch (status) {
      case Status.NotStarted:
        return 'Not Started';
      case Status.InProgress:
        return 'In Progress';
      case Status.Completed:
        return 'Completed';
      default:
        return 'Unknown'; // Handle any unexpected status values
    }
  }

  returnFormatDate(date: Date): string {
    return formatDate(date, 'dd MMM YYYY HH:MM', 'en-US');
  }

  OnSelected(item: Todo) {
    this.isAdd.next(false);
    this.formGroup.patchValue({
      id: item.id,
      name: item.name,
      description: item.description,
      status: item.status,
      dueDate: item.dueDate,
    });
  }

  OnAddClicked() {
    this.isAdd.next(true);
    this.formGroup.reset(defaultForm);
  }

  OnDelete() {
    this.store.dispatch(todoActions.deleteTodo({ todoId: this.getTodo().id }));
  }

  getTodo(): Todo {
    return {
      id: this.formGroup.value.id ?? '',
      name: this.formGroup.value.name ?? '',
      description: this.formGroup.value.description ?? '',
      status: Number(this.formGroup.value.status) ?? 0,
      dueDate: this.formGroup.value.dueDate ?? new Date(),
    }
  }

  OnSave() {
    if (this.isAdd.value == true) {
      this.formGroup.value.id = uuidv4();
      this.store.dispatch(todoActions.createTodo({ todo: this.getTodo() }));
    }
    else {
      this.store.dispatch(todoActions.updateTodo({ todo: this.getTodo() }));
    }
  }

  OnInputChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filter = input.value;
    this.store.dispatch(todoActions.getTodoList({ filter: this.filter, order: this.order }))
  }

  OnSelectChanged(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.order = select.value;
    this.store.dispatch(todoActions.getTodoList({ filter: this.filter, order: this.order }))
  }
}
