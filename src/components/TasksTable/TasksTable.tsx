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
import { ITask } from "../../types/todoTypes";
import { useState } from "react";
import './TasksTable.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { green, pink } from "@mui/material/colors";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { columnsForTasksTable } from "../../constants/constants";

interface TasksTableProps {
    handleOpenDeleteTaskDialog(id: string): void;
    handleOpenUpdateTaskDialog(id: string): void;
    items: ITask[];
    search: string;
}

export const TasksTable = ({ handleOpenDeleteTaskDialog, handleOpenUpdateTaskDialog, items, search }: TasksTableProps) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

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

    const isTaskMatchedWithSearchFilter = (item: ITask) => {
        return item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.priority.toLowerCase().includes(search.toLowerCase()) ||
            item.status.toLowerCase().includes(search.toLowerCase()) ||
            item.estimatedTime.toLowerCase().includes(search.toLowerCase()) ||
            item.untilDate?.toString().toLowerCase().includes(search.toLowerCase());
    }

    const renderRowInTable = (item: ITask, index: number) => {
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
                        <TableCell align="left">
                            {
                                item.priority === "Low" ?
                                    <AssignmentIcon />
                                    : item.priority === "Top" ?
                                        <AssignmentIcon sx={{ color: pink[400] }} /> :
                                        <AssignmentIcon sx={{ color: green[500] }} />
                            }
                        </TableCell>
                        <TableCell>
                            {
                                item.priority === "Low" ?
                                    <KeyboardDoubleArrowDownRoundedIcon sx={{ color: green[500] }} />
                                    : item.priority === "Top" ?
                                        <KeyboardDoubleArrowUpRoundedIcon sx={{ color: pink[500] }} /> :
                                        <ArrowDownwardRoundedIcon />
                            }
                        </TableCell>
                        <TableCell align="right">{item.title}</TableCell>
                        <TableCell align="right">{item.status}</TableCell>
                        <TableCell align="right">
                            {
                                item.estimatedTime ?
                                    <div className="otherInfo">
                                        <em>estimated time:</em><br /> {item.estimatedTime}
                                    </div>
                                    :
                                    " "
                            }
                            {
                                item.untilDate ?
                                    <div className="otherInfo">
                                        <em>until date:</em><br /> {item.untilDate.replace("T", " ")}
                                    </div>
                                    :
                                    " "
                            }
                            {
                                item.timeSpent ?
                                    <div className="otherInfo">
                                        <em>time spent:</em><br /> {item.timeSpent}
                                    </div>
                                    :
                                    " "
                            }
                        </TableCell>
                        <TableCell>
                            <IconButton aria-label="edit" id="updateTaskButton" color="primary" onClick={() => handleOpenUpdateTaskDialog(item.id)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" id="deleteTaskButton" onClick={() => handleOpenDeleteTaskDialog(item.id)}>
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
                            return isTaskMatchedWithSearchFilter(item);
                        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item: ITask, index: number) => {
                                return renderRowInTable(item, index)
                            })
                        }
                        {droppableProvided.placeholder}
                    </TableBody>
                )}
            </Droppable>
        </DragDropContext>
    }

    const renderHeader = () => {
        return <TableHead className="head">
            <TableRow>
                {
                    columnsForTasksTable.map((column) => {
                        return <TableCell align="right">{column.label}</TableCell>
                    })
                }
            </TableRow>
        </TableHead>
    }

    return (
        <Table>
            {renderHeader()}
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
