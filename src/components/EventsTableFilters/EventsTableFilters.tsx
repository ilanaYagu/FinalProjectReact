import { useEffect, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Event } from '../../classes/Event';
import { isFutureDate, isToday } from '../../utils';

enum BeginningTimeEventFilter {
    TodayEvents = "Today Events",
    FutureEvents = "Future Events",
    AllEvents = "All Events"
}

interface EventsTableFiltersProps {
    setEvents(events: Event[]): void;
    allData: Event[];
}

const EventsTableFilters = ({ setEvents, allData }: EventsTableFiltersProps) => {
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
        <Select sx={{ m: "0.2%" }} size="small" value={filter} onChange={(event: SelectChangeEvent<string>) => setFilter(event.target.value as BeginningTimeEventFilter)}>
            {
                Object.values(BeginningTimeEventFilter).map((value) => {
                    return <MenuItem value={value}>{value}</MenuItem>
                })
            }
        </Select>
    );
};

export default EventsTableFilters;

