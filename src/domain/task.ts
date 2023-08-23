import moment from 'moment'

export class Task {
  constructor(
    readonly id: TaskId,
    readonly content: TaskContent,
    readonly status: TaskStatus,
    readonly createdAt: TaskCreatedAt,
    readonly updatedAt: TaskUpdatedAt
  ) { }

  readonly STATUS = {
    TODO: 1,
    DONE: 2,
  } as const;

  updateStatus(status: number) {
    const task = new Task(
      new TaskId(this.id.value),
      new TaskContent(this.content.value),
      new TaskStatus(Number(status)),
      new TaskCreatedAt(this.createdAt.value),
      new TaskUpdatedAt(this.updatedAt.value)
    )

    return task
  }
}

export class TaskId {
  constructor(readonly value: number) { }
}

export class TaskContent {
  constructor(readonly value: string) { }
}

export class TaskStatus {
  constructor(readonly value: number) { }
}

export class TaskCreatedAt {
  constructor(readonly value: moment.Moment) { }
}

export class TaskUpdatedAt {
  constructor(readonly value: moment.Moment) { }
}

export class Tasks {
  constructor(readonly values: Task[]) { }
}