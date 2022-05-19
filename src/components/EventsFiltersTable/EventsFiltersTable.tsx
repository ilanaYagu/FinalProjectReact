import React, { useContext, useEffect, useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Event } from '../../classes/Event';
import { isFutureDate, isToday } from '../../utils/utils';


enum BeginningTimeEventFilter {
    TodayEvents = "Today Events",
    FutureEvents = "Future Events",
    AllEvents = "All Events"
}

interface EventsFiltersTableProps {
    setEvents(events: Event[]): void;
    allData: Event[];
}

const EventsFiltersTable = ({ setEvents, allData }: EventsFiltersTableProps) => {
    const [filter, setFilter] = useState<BeginningTimeEventFilter>(BeginningTimeEventFilter.AllEvents);

    useEffect(() => {
        setEvents(filteredEvents());
    }, [filter, allData])

    const filteredEvents = (): Event[] => {
        return allData.filter((event: Event) => {
            const eventDate = new Date(event.beginningTime);
            if (filter === BeginningTimeEventFilter.AllEvents) {
                return true;
            }
            else if (filter === BeginningTimeEventFilter.TodayEvents) {
                return isToday(eventDate);
            }
            else {
                return isFutureDate(eventDate)
            }
        })
    }

    return (
        <Select
            style={{ width: "auto", height: "40px", marginLeft: "9px", marginRight: "9px" }}
            value={filter} onChange={(event: SelectChangeEvent<string>) => setFilter(event.target.value as BeginningTimeEventFilter)}
        >
            {
                Object.values(BeginningTimeEventFilter).map((value) => {
                    return <MenuItem value={value}>{value}</MenuItem>
                })
            }
        </Select>
    );
};

export default EventsFiltersTable;

