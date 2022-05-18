import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { FilterDashboardTable } from '../../types/generalTypes';
import './DashboardFiltersTable.css';
import { Basic } from '../../classes/Basic';
import { Task } from '../../classes/Task';
import { Event } from '../../classes/Event';

interface DashboardFiltersTableProps {
    setDataTable(newData: Basic[]): void;
    allData: Basic[];
}

const DashboardFiltersTable = ({ setDataTable, allData }: DashboardFiltersTableProps) => {
    const [filters, setFilters] = useState<FilterDashboardTable[]>([
        { active: false, label: "Tasks", name: "onlyTasks" },
        { active: false, label: "Events", name: "onlyEvents" },
        { active: false, label: "uncompleted tasks", name: "uncompletedTasks" },
        { active: false, label: "high priority tasks", name: "highPriorityTasks" }
    ]);

    useEffect(() => {
        setDataTable(filteredData())
    }, [filters, allData])

    const filteredData = (): Basic[] => {
        return allData.filter((item: Basic) => {
            return isItemMatchFilters(item);
        })
    }

    const isItemMatchFilters = (item: Basic): boolean => {
        let isMatch = true;
        filters.map((filter: FilterDashboardTable) => {
            if (filter.active) {
                switch (filter.name) {
                    case "onlyTasks": {
                        isMatch = item instanceof Task;
                        break;
                    }
                    case "onlyEvents": {
                        isMatch = item instanceof Event;
                        break;
                    }
                    case "uncompletedTasks":
                        isMatch = item instanceof Task && item.status !== "Done";
                        break;
                    case "highPriorityTasks":
                        isMatch = item instanceof Task && item.priority === "Top";
                        break;
                }
            }
        })
        return isMatch;
    }

    const onClickFilter = (filter: FilterDashboardTable): void => {
        const newActiveStatus = !filter.active;
        const nfilters = filters.slice();
        nfilters.forEach((nfilter: FilterDashboardTable) => {
            nfilter.active = filter.name === nfilter.name ? newActiveStatus : false;
        });
        setFilters(nfilters);
    }

    return (
        <div>
            {
                filters.map((filter: FilterDashboardTable) =>
                    <Button className={filter.active ? "active filterButton" : "filterButton"} variant="contained"
                        onClick={() => onClickFilter(filter)}>{filter.label}</Button>

                )
            }
        </div>
    );
};

export default DashboardFiltersTable;

