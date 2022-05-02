type IMenuItem = {
    title: string;
    path: string;
}

export const menu: readonly IMenuItem[] = [
    {
        title: "Today tasks and events",
        path: "/dashboard"
    },
    {
        title: "Tasks list",
        path: "/tasks"
    },
    {
        title: "Events list",
        path: "/events"
    }
]