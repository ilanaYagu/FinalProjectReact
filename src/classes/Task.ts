import { Priority, Status } from "../types/tasksTypes";
import { Basic } from "./Basic";

export class Task extends Basic {
  estimatedTime: string;
  status: Status;
  priority: Priority;
  review: string;
  timeSpent: string;
  untilDate: string;

  constructor(id: string, title: string, description: string, estimatedTime: string, status: Status, priority: Priority, review: string, timeSpent: string, untilDate: string) {
    super(id, title, description);
    this.estimatedTime = estimatedTime || "";
    this.status = status || "Open";
    this.priority = priority;
    this.review = review || "";
    this.timeSpent = timeSpent || "";
    this.untilDate = untilDate || "";
  }


}