import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

export class CompleteTaskCommand extends AbstractCommand {
  private previousState: boolean | undefined;

  constructor(
      private readonly taskList: TaskList,
      private readonly taskId: string,
      private readonly completed: boolean = true
  ) {
    super();
  }

  execute(): void {
    const task: Task | undefined = this.taskList.getAllTasks().find(t => t.id === this.taskId);
    if (!task) return;
    this.previousState = task.completed;
    this.taskList.completeTask(this.taskId, this.completed);
  }

  undo(): void {
    if (this.previousState === undefined) return;
    this.taskList.completeTask(this.taskId, this.previousState);
  }
}