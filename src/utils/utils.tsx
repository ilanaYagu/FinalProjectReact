import { Basic } from "../classes/Basic";
import { Event } from "../classes/Event";
import { Task } from "../classes/Task";


export const isFutureDate = (date: Date) => {
    return date.getTime() > new Date().getTime()
}

export const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear();
}

export const filterTodayItems = (items: Basic[]): Basic[] => {
    return items.filter((item: Basic) => {
        if (item instanceof Event) {
            return isToday(new Date(item.beginningTime))
        } else if (item instanceof Task) {
            return isToday(new Date(item.untilDate))
        }
        return false;
    });
}