import { PriorityType, StatusType } from "../types/tasksTypes";
import { BasicItem } from "./BasicItem";

export class Task extends BasicItem {
  estimatedTime: string;
  status: StatusType;
  priority: PriorityType;
  review: string;
  timeSpent: string;
  untilDate: string;

  constructor(task: Task) {
    super(task._id, task.title, task.description);
    this.estimatedTime = task.estimatedTime || "";
    this.status = task.status || "Open";
    this.priority = task.priority;
    this.review = task.review || "";
    this.timeSpent = task.timeSpent || "";
    this.untilDate = task.untilDate || "";
  }


}