import React, { useContext, useEffect, useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { EventsContext } from '../../context/eventsContext';
import { BeginningTimeEventFilterOption, EventsContextType, BeginningTimeEventFilter } from '../../types/eventsTypes';
import { BeginningTimeEventOptions } from '../../constants/constants';
import { Event } from '../../classes/Event';
import { isFutureDate, isToday } from '../../utils/utils';

interface EventsFiltersTableProps {
    setEvents(events: Event[]): void;
}

const EventsFiltersTable = ({ setEvents }: EventsFiltersTableProps) => {
    const { events } = useContext(EventsContext) as EventsContextType;
    const [filters, setFilters] = useState<BeginningTimeEventFilter>({
        selectedBeginningTimeEvent: ""
    });

    useEffect(() => {
        setEvents(filteredEvents());
    }, [filters, events])

    const filteredEvents = (): Event[] => {
        return events.filter((event: Event) => {
            const eventDate = new Date(event.beginningTime);
            if (filters.selectedBeginningTimeEvent as string === '') {
                return true;
            }
            else if (filters.selectedBeginningTimeEvent as string === 'Events For Today') {
                return isToday(eventDate);
            }
            else {
                isFutureDate(eventDate)
            }
        })
    }

    return (
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
    );
};

export default EventsFiltersTable;

