import React, { useState } from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult } from "react-beautiful-dnd";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomRenderers, IMinTableItem, otherColumnProperties, TableHeaders } from "../../types/generalTypes";
import './ItemsTable.css';

interface ItemsTableProps<T extends IMinTableItem> {
    items: T[];
    headers: TableHeaders<T>;
    customRenderers?: CustomRenderers<T>;
    otherColumn?: otherColumnProperties<T>;
    deleteItem(item: T): void;
    editItem(item?: T): void;
    search: string;
    searchableProperties: (keyof T)[];
}

export default function ItemsTable<T extends IMinTableItem>(props: ItemsTableProps<T>) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                                Object.entries(props.headers).map(([headerKey]) => {
                                    if (headerKey !== "other" && headerKey !== "actions") {
                                        const customRenderer = props.customRenderers?.[headerKey];
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
                                props.otherColumn &&
                                <TableCell>
                                    {
                                        Object.entries(props.otherColumn).map(([key, value]) => {
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
                                <IconButton aria-label="edit" id="updateTaskButton" color="primary" onClick={() => props.editItem(item)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" id="deleteTaskButton" onClick={() => props.deleteItem(item)}>
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
        const temp = props.items;
        const d = temp[result.destination!.index];
        temp[result.destination!.index] = temp[result.source.index];
        temp[result.source.index] = d;
        props.items = temp;
    };

    const isMatchedWithSearchFilter = (itm: T) => {
        let isMatched = false;
        props.searchableProperties.forEach((k: keyof T) => {
            const valueToCheck: string = itm[k] as unknown as string;
            isMatched = isMatched || valueToCheck.toLowerCase().includes(props.search.toLowerCase());
        });
        return isMatched;
    }

    return (
        <Table>
            <TableHead className="head">
                <TableRow>
                    {Object.entries(props.headers).map(([key, header]) => {
                        return <TableCell>{header}</TableCell>
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
                                props.items.filter((item) => {
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
                count={props.items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Table>
    );
}
