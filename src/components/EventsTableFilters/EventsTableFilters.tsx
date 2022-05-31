import { useEffect, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Event } from '../../classes/Event';
import { isFutureDate, isToday } from '../../date-utils';

enum BeginningTimeEventFilterType {
    TodayEvents = "Today Events",
    FutureEvents = "Future Events",
    AllEvents = "All Events"
}

interface EventsTableFiltersProps {
    setEvents(events: Event[]): void;
    data: Event[];
}

const EventsTableFilters = ({ setEvents, data }: EventsTableFiltersProps) => {
    const [filter, setFilter] = useState<BeginningTimeEventFilterType>(BeginningTimeEventFilterType.AllEvents);

    useEffect(() => {
        setEvents(filteredEvents());
    }, [filter, data])

    const filteredEvents = (): Event[] =>
        data.filter((event: Event) => {
            const eventDate = new Date(event.beginningTime);
            if (filter === BeginningTimeEventFilterType.AllEvents) {
                return true;
            }
            else if (filter === BeginningTimeEventFilterType.TodayEvents) {
                return isToday(eventDate);
            }
            else {
                return isFutureDate(eventDate)
            }
        })

    return (
        <Select sx={{ m: "0.2%" }} size="small" value={filter} onChange={(event: SelectChangeEvent<string>) => setFilter(event.target.value as BeginningTimeEventFilterType)}>
            {
                Object.values(BeginningTimeEventFilterType).map((value) => {
                    return <MenuItem value={value}>{value}</MenuItem>
                })
            }
        </Select>
    );
};

export default EventsTableFilters;

