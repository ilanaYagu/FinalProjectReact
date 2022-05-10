import React, { useContext, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { EventsContext } from '../../../context/eventsContext';
import { EventsContextType, IBeginningTimeEventFilter, IEvent } from '../../../types/eventsTypes';
import { ITask, TodoContextType } from '../../../types/tasksTypes';
import { TodoContext } from '../../../context/tasksContext';
import './FiltersDashboardTable.css';

interface FiltersDashboardTableProps {
    setItems(newTasks: (IEvent | ITask)[]): void;
}

type FilterDashboardTableOption = "onlyTasks" | "onlyEvents" | "uncompletedTasks" | "highPriorityTasks"

interface FilterDashboardTable {
    active: boolean;
    label: string;
    name: FilterDashboardTableOption;
}

const FiltersDashboardTable = ({ setItems }: FiltersDashboardTableProps) => {

    const { todos } = useContext(TodoContext) as TodoContextType;
    const { events } = useContext(EventsContext) as EventsContextType;
    const [data, setData] = useState<(ITask | IEvent)[]>([...events, ...todos]);

    const [filters, setFilters] = useState<FilterDashboardTable[]>([
        { active: false, label: "Tasks", name: "onlyTasks" },
        { active: false, label: "Events", name: "onlyEvents" },
        { active: false, label: "uncompleted tasks", name: "uncompletedTasks" },
        { active: false, label: "high property", name: "highPriorityTasks" }
    ]);

    useEffect(() => {
        setItems(data.filter((value: IEvent | ITask) => {
            let isMatch = true;
            filters.map((val) => {
                if (val.active) {
                    switch (val.name) {
                        case "onlyTasks": {
                            isMatch = "priority" in value;
                            break;
                        }
                        case "onlyEvents": {
                            isMatch = !("priority" in value);
                            break;
                        }
                        case "uncompletedTasks":
                            isMatch = "status" in value && value.status !== "Done";
                            break;
                        case "highPriorityTasks":
                            isMatch = "priority" in value && value.priority === "Top";
                            break;
                    }
                }
            })
            return isMatch;
        }))
    }, [filters, data])

    useEffect(() => {
        setData([...events, ...todos])
    }, [events, todos])


    const onClickFilter = (filter: FilterDashboardTable) => {
        const newActiveStatus = !filter.active;
        const nfilters = filters.slice(); // Create local copy to change.
        nfilters.forEach((nfilter) => {
            if (newActiveStatus && filter.name !== nfilter.name) {
                nfilter.active = false;
            }
            else if (filter.name === nfilter.name) {
                nfilter.active = newActiveStatus;
            }
        });
        console.log("onclick")
        setFilters(nfilters);
    }

    return (
        <Box display="flex" style={{ marginTop: 20 }}>
            <div id="titleFilterBox">Quick Filters:</div>
            <div>
                {
                    filters.map((filter) => {
                        return <Button className="filterButton" variant="contained"
                            onClick={() => onClickFilter(filter)}>{filter.label}</Button>

                    })
                }
            </div>
        </Box>
    );
};

export default FiltersDashboardTable;

