import React, { MouseEventHandler, useState } from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from "@mui/material";
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult } from "react-beautiful-dnd";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomRenderers, IMinTableItem, otherColumnProperties, TableHeaders } from "../../types/generalTypes";
import './ItemsTable.css';

interface ItemsTableProps<T extends IMinTableItem> {
    items: T[];
    setItems(newItems: T[]): void;
    headers: TableHeaders<T>;
    customRenderers?: CustomRenderers<T>;
    otherColumn?: otherColumnProperties<T>;
    deleteItem(item: T): void;
    editItem(item?: T): void;
    search: string;
    searchableProperties: (keyof T)[];
}

type ISortOrder = "asc" | "desc" | undefined;
type ISortBy<T extends IMinTableItem> = keyof TableHeaders<T> | "";

export default function ItemsTable<T extends IMinTableItem>({ items, setItems, headers, customRenderers, otherColumn, deleteItem, editItem, search, searchableProperties }: ItemsTableProps<T>) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState<ISortBy<T>>("")
    const [sortOrder, setSortOrder] = useState<ISortOrder>(undefined)

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortData = (newSortBy: ISortBy<T>, newSortOrder: ISortOrder) => {
        return items.sort((i: T, j: T) => {
            if (!(newSortOrder === undefined || ["other", "actions", "type"].includes(newSortBy) || newSortBy === "")) {
                if (!i[newSortBy] || !j[newSortBy]) {
                    if (i[newSortBy]) {
                        return newSortOrder === "asc" ? 1 : -1
                    } else {
                        return newSortOrder === "asc" ? -1 : 1;
                    }
                } else {
                    if (i[newSortBy] < j[newSortBy]) {
                        return newSortOrder === "asc" ? -1 : 1;
                    }

                    else if (i[newSortBy] > j[newSortBy]) {
                        return newSortOrder === "asc" ? 1 : -1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            return 0;
        });
    }

    const requestSort = (pSortBy: ISortBy<T>) => {
        let newSortOrder: ISortOrder = sortOrder;
        let newSortBy: ISortBy<T> = sortBy;
        return () => {
            if (pSortBy === sortBy) {
                if (sortOrder === "desc") {
                    newSortOrder = "asc";
                    newSortBy = "";
                    setSortBy(newSortBy);
                } else {
                    newSortOrder = "desc"
                }
            } else {
                newSortOrder = "asc";
                newSortBy = pSortBy;
                setSortBy(newSortBy);
            }
            setSortOrder(newSortOrder);
            newSortBy && setItems(sortData(newSortBy, newSortOrder));
        };
    }

    const renderRow = (item: T, index: number) => {
        return (
            <Draggable
                key={item.id + " " + index}
                draggableId={item.id + " " + index}
                index={index}
            >
                {(
                    draggableProvided: DraggableProvided) => {
                    return (
                        <TableRow
                            className="TableRow"
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                        >
                            {
                                Object.entries(headers).map(([headerKey]) => {
                                    if (headerKey !== "other" && headerKey !== "actions") {
                                        const customRenderer = customRenderers?.[headerKey];
                                        return <TableCell>
                                            {
                                                customRenderer ?
                                                    customRenderer(item) : headerKey in item ? item[headerKey as keyof T]
                                                        : ""
                                            }
                                        </TableCell>
                                    }
                                    return <></>;
                                })
                            }
                            {
                                otherColumn &&
                                <TableCell>
                                    {
                                        Object.entries(otherColumn).map(([key, value]) => {
                                            return item[key as keyof T] ?
                                                <div className="otherInfo">
                                                    <em>{value}</em><br /> {item[key as keyof T]}
                                                </div>
                                                :
                                                " "
                                        })
                                    }
                                </TableCell>
                            }
                            <TableCell>
                                <IconButton aria-label="edit" id="updateTaskButton" color="primary" onClick={() => editItem(item)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" id="deleteTaskButton" onClick={() => deleteItem(item)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    );
                }}
            </Draggable>)
    }

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }
        const temp = items;
        const d = temp[result.destination!.index];
        temp[result.destination!.index] = temp[result.source.index];
        temp[result.source.index] = d;
        items = temp;
    };

    const isMatchedWithSearchFilter = (itm: T) => {
        let isMatched = false;
        searchableProperties.forEach((k: keyof T) => {
            const valueToCheck: string = itm[k] as unknown as string;
            isMatched = isMatched || valueToCheck.toLowerCase().includes(search.toLowerCase());
        });
        return isMatched;
    }

    return (
        <Table>
            <TableHead className="head">
                <TableRow>
                    {Object.entries(headers).map(([key, header]) => {
                        return <TableCell>
                            <TableSortLabel
                                active={sortBy === key}
                                direction={sortOrder}
                                onClick={requestSort(key as ISortBy<T>)}
                            >
                                {header}
                            </TableSortLabel>
                        </TableCell>
                    })}
                </TableRow>
            </TableHead>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasksAndEventsForToday" direction="vertical">
                    {(droppableProvided: DroppableProvided) => (
                        <TableBody
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}>
                            {
                                items.filter((item) => {
                                    return isMatchedWithSearchFilter(item);
                                }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(renderRow)
                            }

                        </TableBody>
                    )}
                </Droppable>
            </DragDropContext>
            <TablePagination
                id="pagination"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Table>
    );
}
