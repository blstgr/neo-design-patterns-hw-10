import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";
import { Task } from "../models/Task";

export class UpdateTaskCommand extends AbstractCommand {
  private oldTask: Task | undefined;

  constructor(
      private readonly taskList: TaskList,
      private readonly taskId: string,
      private readonly updates: Partial<Task>
  ) {
    super();
  }

  execute(): void {
    const currentTask = this.taskList.getAllTasks().find(t => t.id === this.taskId);
    if (!currentTask) return;

    this.oldTask = { ...currentTask }; // make a copy for undo
    this.taskList.updateTask(this.taskId, this.updates);
  }

  undo(): void {
    if (!this.oldTask) return;
    this.taskList.updateTask(this.taskId, this.oldTask);
  }
}