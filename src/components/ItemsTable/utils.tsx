import { Basic } from "../../classes/Basic";
import { customSortProperties, SortBy, SortOrder } from "./ItemsTable";

export type CustomSortProperties = {
    property: SortBy;
    sort: (a: Basic, b: Basic, orderBy: SortBy) => number;
}

export function getComparator(order: SortOrder, orderBy: SortBy): (a: Basic, b: Basic) => number {
    return order === SortOrder.Desc ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

export const sortByEstimatedTime = (a: Basic, b: Basic, orderBy: SortBy): number => {
    const numA = parseInt(a[orderBy as keyof Basic]?.replace(/^\D+/g, ''));
    let dateA = new Date();
    dateA.setDate(new Date().getDate() + (a[orderBy as keyof Basic]?.includes("d") ? numA : numA * 7));

    const numB = parseInt(b[orderBy as keyof Basic]?.replace(/^\D+/g, ''));
    let dateB = new Date();
    dateB.setDate(new Date().getDate() + (b[orderBy as keyof Basic]?.includes("d") ? numB : numB * 7))
    return compare(dateA, dateB);
}

const descendingComparator = (a: Basic, b: Basic, orderBy: SortBy): number => {
    if (customSortProperties.filter(e => e.property === orderBy).length > 0) {
        return doCustomSort(a, b, orderBy)
    }
    return compare(a[orderBy as keyof Basic], b[orderBy as keyof Basic])
}

const doCustomSort = (a: Basic, b: Basic, orderBy: SortBy): number => {
    let comparationResult: number = 0;
    customSortProperties.forEach(property => {
        if (property.property === orderBy) {
            comparationResult = property.sort(a, b, orderBy);
        }
    });
    return comparationResult;
}

const compare = <T,>(a: T, b: T) => {
    if (b < a) {
        return -1;
    }
    if (b > a) {
        return 1;
    }
    return 0;
}