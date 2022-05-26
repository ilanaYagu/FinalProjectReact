import { Event } from "../../classes/Event";
import { Task } from "../../classes/Task";

export type TaskInputs = Omit<Task, "id" | "title" | "description">;

export type EventInputs = Omit<Event, "id" | "title" | "description">;
