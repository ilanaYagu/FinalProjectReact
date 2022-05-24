type IMenuItem = {
    title: string;
    path: string;
}

export const menu: readonly IMenuItem[] = [
    {
        title: "Today Tasks and Events",
        path: "/dashboard"
    },
    {
        title: "Tasks",
        path: "/tasks"
    },
    {
        title: "Events",
        path: "/events"
    }
]