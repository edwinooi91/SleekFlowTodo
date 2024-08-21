export interface Todo {
  id: string,
  name: string,
  description: string,
  dueDate: Date,
  status: number,
}

export enum Status {
  NotStarted,
  InProgress,
  Completed,
}


export class StatusEnum {
  public name: string = "";
  public value: Status = Status.NotStarted;

  static GetStatusEnum(): StatusEnum[] {
    return Object.entries(Status)
      .filter(([_, value]) => typeof value === 'number')
      .map(([key, value]) => ({
        name: key,
        value: value as Status,
      }));
  }
}

