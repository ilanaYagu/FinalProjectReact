import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    DraggableProvided,
    DroppableProvided,
} from "react-beautiful-dnd";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { columnsForEventsTable, columnsForTasksTable } from "../../../constants/constants";
import { IEvent } from "../../../types/eventsTypes";
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded';

interface EventsTableProps {
    handleOpenDeleteEventDialog(event: IEvent): void;
    handleOpenUpdateEventDialog(id: string): void;
    items: IEvent[];
    search: string;
}

export const EventsTable = ({ handleOpenDeleteEventDialog, handleOpenUpdateEventDialog, items, search }: EventsTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


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

    const isEventMatchedWithSearchFilter = (item: IEvent) => {
        return item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.beginningTime.toLowerCase().includes(search.toLowerCase()) ||
            item.endingTime.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.location?.toString().toLowerCase().includes(search.toLowerCase());
    }

    const renderRowInTable = (item: IEvent, index: number) => {
        return (<Draggable
            key={item.id}
            draggableId={item.id}
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
                        <TableCell align="right">
                            <Brightness1RoundedIcon sx={{ color: "#" + item.color.hex }} />
                        </TableCell>
                        <TableCell align="right">{item.title}</TableCell>
                        <TableCell align="right">{item.beginningTime.replace("T", " ")}</TableCell>
                        <TableCell align="right">{item.endingTime.replace("T", " ")}</TableCell>
                        <TableCell align="right">{item.location}</TableCell>
                        <TableCell>
                            <IconButton aria-label="edit" id="updateTaskButton" color="primary" onClick={() => handleOpenUpdateEventDialog(item.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" id="deleteTaskButton" onClick={() => handleOpenDeleteEventDialog(item)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                );
            }}
        </Draggable>)
    }

    const renderBody = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks" direction="vertical">
                {(droppableProvided: DroppableProvided) => (
                    <TableBody
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}>
                        {items.filter((item) => {
                            return isEventMatchedWithSearchFilter(item);
                        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item: IEvent, index: number) => {
                                return renderRowInTable(item, index)
                            })
                        }
                        {droppableProvided.placeholder}
                    </TableBody>
                )}
            </Droppable>
        </DragDropContext>
    }

    return (
        <Table>
            {renderBody()}
            <TablePagination
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
};
