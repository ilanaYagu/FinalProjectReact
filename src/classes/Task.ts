import { PriorityType, StatusType } from "../types/tasksTypes";
import { BasicItem } from "./BasicItem";

export class Task extends BasicItem {
  estimatedTime: string;
  status: StatusType;
  priority: PriorityType;
  review: string;
  timeSpent: string;
  untilDate: string;

  constructor(id: string, title: string, description: string, estimatedTime: string, status: StatusType, priority: PriorityType, review: string, timeSpent: string, untilDate: string) {
    super(id, title, description);
    this.estimatedTime = estimatedTime || "";
    this.status = status || "Open";
    this.priority = priority;
    this.review = review || "";
    this.timeSpent = timeSpent || "";
    this.untilDate = untilDate || "";
  }


}