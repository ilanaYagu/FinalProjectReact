import React, { useState, useContext } from "react";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import { DragDropContext, Droppable, DroppableProvided, DropResult } from "react-beautiful-dnd";
import { CustomRenderers, DeleteItemFormContextType, ItemFormContextType, otherColumnProperties, TableHeaders } from "../../types/generalTypes";
import { Basic } from "../../classes/Basic";
import ItemInTable from "./ItemInTable";
import { ItemFormContext } from "../../context/itemFormContext";
import { DeleteItemFormContext } from "../../context/deleteItemFormContext";
import { makeStyles } from "@mui/styles";

interface ItemsTableProps {
    items: Basic[];
    setItems(newItems: Basic[]): void;
    headers: TableHeaders<Basic>;
    customRenderers?: CustomRenderers<Basic>;
    otherColumn?: otherColumnProperties<Basic>;
    search: string;
    searchableProperties: (keyof Basic)[];
}

enum SortOrder {
    Asc = "asc",
    Desc = "desc",
    Nothing = ""
}

type SortBy = keyof TableHeaders<Basic> | "";

const useStyles = makeStyles({
    pagination: {
        overflow: "inherit !important"
    },
    header: {
        fontWeight: "bold !important",
        fontSize: "18px !important",
        whiteSpace: "nowrap",
    }
});

const ItemsTable = ({ items, setItems, headers, customRenderers, otherColumn, search, searchableProperties }: ItemsTableProps) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState<SortBy>("");
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Nothing);
    const { handleOpenUpdateForm } = useContext<ItemFormContextType>(ItemFormContext);
    const { handleOpenDeleteDialog } = useContext<DeleteItemFormContextType>(DeleteItemFormContext);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortData = (newSortBy: SortBy, newSortOrder: SortOrder) => {
        return items.sort((i: Basic, j: Basic) => {
            if (!(newSortOrder === undefined || ["other", "actions", "type"].includes(newSortBy) || newSortBy === "")) {
                if (!i[newSortBy] || !j[newSortBy]) {
                    if (i[newSortBy]) {
                        return newSortOrder === SortOrder.Asc ? 1 : -1
                    } else {
                        return newSortOrder === SortOrder.Asc ? -1 : 1;
                    }
                } else {
                    if (i[newSortBy] < j[newSortBy]) {
                        return newSortOrder === SortOrder.Asc ? -1 : 1;
                    }

                    else if (i[newSortBy] > j[newSortBy]) {
                        return newSortOrder === SortOrder.Asc ? 1 : -1;
                    }
                    else {
                        return 0;
                    }
                }
            }
            return 0;
        });
    }

    const requestSort = (pSortBy: SortBy) => {
        let newSortOrder: SortOrder = sortOrder;
        let newSortBy: SortBy = sortBy;
        return () => {
            if (pSortBy === sortBy) {
                if (sortOrder === SortOrder.Desc) {
                    newSortOrder = SortOrder.Asc;
                    newSortBy = "";
                    setSortBy(newSortBy);
                } else {
                    newSortOrder = SortOrder.Desc
                }
            } else {
                newSortOrder = SortOrder.Asc;
                newSortBy = pSortBy;
                setSortBy(newSortBy);
            }
            setSortOrder(newSortOrder);
            newSortBy && setItems(sortData(newSortBy, newSortOrder));
        };
    }

    const renderHeader = () => {
        return <TableHead>
            <TableRow>
                {Object.entries(headers).map(([key, header]) => {
                    return <TableCell className={classes.header} align="center">
                        <TableSortLabel active={sortBy === key} direction={sortOrder === SortOrder.Nothing ? undefined : sortOrder}
                            onClick={requestSort(key as SortBy)}>
                            {header}
                        </TableSortLabel>
                    </TableCell>
                })}
            </TableRow>
        </TableHead>
    }

    const renderBody = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="items" direction="vertical" >
                {(droppableProvided: DroppableProvided) => (
                    <TableBody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                        {
                            items.filter((item) => {
                                return isMatchedWithSearchFilter(item);
                            }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(renderRowInTableBody)
                        }
                    </TableBody>
                )}
            </Droppable>
        </DragDropContext>
    }

    const renderRowInTableBody = (item: Basic, index: number) => {
        return <ItemInTable item={item} index={index} headers={headers} customRenderers={customRenderers} otherColumn={otherColumn} deleteItem={handleOpenDeleteDialog} editItem={handleOpenUpdateForm} />
    }

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination || result.destination.index === result.source.index) {
            return;
        }
        const temp = [...items];
        const d = temp[result.destination!.index];
        temp[result.destination!.index] = temp[result.source.index];
        temp[result.source.index] = d;
        setItems(temp);
    };

    const isMatchedWithSearchFilter = (itm: Basic) => {
        let isMatched = false;
        searchableProperties.forEach((k: keyof Basic) => {
            const valueToCheck: string = itm[k] as unknown as string;
            isMatched = isMatched || valueToCheck.toLowerCase().includes(search.toLowerCase());
        });
        return isMatched;
    }

    return (
        <Table>
            {renderHeader()}
            {renderBody()}
            <TablePagination className={classes.pagination} rowsPerPageOptions={[5, 10, 25]} component="div" count={items.length}
                rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage} />
        </Table>
    );
}

export default ItemsTable;