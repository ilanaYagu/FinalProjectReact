import { Basic } from "../../classes/Basic";
import { justifySortProperties, SortBy, SortOrder } from "./ItemsTable";

export type JustifySortProperties = {
    property: SortBy;
    sort: (a: Basic, b: Basic, orderBy: SortBy) => number;
}

const descendingComparator = (a: Basic, b: Basic, orderBy: SortBy): number => {
    if (justifySortProperties.filter(e => e.property === orderBy).length > 0) {
        return doJustifySort(a, b, orderBy)
    }
    return compare(a[orderBy as keyof Basic], b[orderBy as keyof Basic])
}

const doJustifySort = (a: Basic, b: Basic, orderBy: SortBy): number => {
    let comparationResult: number = 0;
    justifySortProperties.forEach(property => {
        if (property.property === orderBy) {
            comparationResult = property.sort(a, b, orderBy);
        }
    });
    return comparationResult;
}

export function getComparator(order: SortOrder, orderBy: SortBy): (a: Basic, b: Basic) => number {
    return order === SortOrder.Desc ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

export const sortByEstimatedTime = (a: Basic, b: Basic, orderBy: SortBy): number => {
    const numA = parseInt(a[orderBy as keyof Basic]?.replace(/^\D+/g, ''));
    let dateA = new Date();
    dateA.setDate(new Date().getDate() + (a[orderBy as keyof Basic]?.includes("d") ? numA : numA * 7));

    let dateB = new Date();
    const numB = parseInt(b[orderBy as keyof Basic]?.replace(/^\D+/g, ''));
    dateB.setDate(new Date().getDate() + (b[orderBy as keyof Basic]?.includes("d") ? numB : numB * 7))
    return compare(dateA, dateB);
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