import React, { useContext, useEffect, useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { EventsContext } from '../../../context/eventsContext';
import { BeginningTimeEventFilterOption, BeginningTimeEventOptions, EventsContextType, IBeginningTimeEventFilter, IEvent } from '../../../types/eventsTypes';

interface FiltersEventsTableProps {
    setEvents(newTasks: IEvent[]): void;
}

const FiltersEventsTable = ({ setEvents }: FiltersEventsTableProps) => {
    const { events } = useContext(EventsContext) as EventsContextType;

    const [filters, setFilters] = useState<IBeginningTimeEventFilter>({
        selectedBeginningTimeEvent: ""
    });

    useEffect(() => {
        setEvents(events.filter((item: IEvent) => {
            const today = new Date();
            const eventDate = new Date(item.beginningTime);
            let itemMatchFilters = filters.selectedBeginningTimeEvent as string === 'Events For Today' ?
                eventDate.getDate() == today.getDate() &&
                eventDate.getMonth() == today.getMonth() &&
                eventDate.getFullYear() == today.getFullYear()
                : true;

            itemMatchFilters = filters.selectedBeginningTimeEvent as string === 'Future Events' ?
                eventDate.getTime() > new Date().getTime()
                : itemMatchFilters;
            return itemMatchFilters;

        }));
    }, [filters, events])

    return (
        <Box display="flex" style={{ marginTop: 20 }}>
            <div>Quick Filters:</div>

            <Select
                style={{ width: "auto", height: "40px", marginLeft: "9px", marginRight: "9px" }}
                value={filters.selectedBeginningTimeEvent}
                onChange={(event: SelectChangeEvent<string>) => setFilters({ ...filters, selectedBeginningTimeEvent: event.target.value as BeginningTimeEventFilterOption })}
                name="priority"
                displayEmpty
            >
                <MenuItem value="">All Events</MenuItem>
                {
                    BeginningTimeEventOptions.map((option: BeginningTimeEventFilterOption) => <MenuItem value={option}>{option}</MenuItem>)
                }
            </Select>
        </Box>
    );
};

export default FiltersEventsTable;

