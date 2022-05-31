
export type OtherColumnProperties<T> = Partial<Record<keyof T, string>>;

export type CustomRenderers<T> = Partial<
    Record<keyof T | string, (it: T) => React.ReactNode>
>;
export type TableHeaders<T> = Partial<Record<keyof T, string>> | Record<ExternalHeaders, string>;

export type ExternalHeaders = "type" | "actions" | "other" | "color";

export enum ItemType {
    Task = 'Task',
    Event = 'Event',
}



