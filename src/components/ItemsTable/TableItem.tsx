import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { BasicItem } from '../../classes/BasicItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { OtherColumnProperties, TableHeaders } from '../../types/managementTableTypes';
import { makeStyles } from "@material-ui/styles";
import { Task } from '../../classes/Task';
import { Event } from '../../classes/Event';
import { ReactNode } from 'react';
import { getColorIcon, getPriorityIcon, getTypeIcon } from './items-table-utils';

const customRendersHeaders = [{ headerKey: "type", render: getTypeIcon }, { headerKey: "color", render: getColorIcon }
    , { headerKey: "priority", render: getPriorityIcon }];

const otherColumnProperties: OtherColumnProperties<Task> | OtherColumnProperties<Event> = {
    status: "Status",
    untilDate: "Until Date",
    beginningTime: "From",
    endingTime: "Until",
    estimatedTime: "Estimated Time",
    location: "Location"
};

interface TableItemProps {
    item: BasicItem;
    index: number;
    headers: TableHeaders<BasicItem>;
    handleEditItem: (itemToUpdate: BasicItem) => void;
    handleDeleteItem: (itemToUpdate: BasicItem) => void;
}

const useStyles = makeStyles({
    otherInfoText: {
        textDecoration: "underline"
    },
    otherInfo: {
        margin: "4%",
        marginRight: "1%"
    }
});

const TableItem = ({ item, index, headers, handleEditItem, handleDeleteItem }: TableItemProps) => {
    const classes = useStyles();

    const getTableCell = (headerKey: string) =>
        <TableCell sx={{ whiteSpace: "nowrap", width: "10%" }} align="center">
            {getTableCellContent(headerKey)}
        </TableCell>

    const getTableCellContent = (headerKey: string): ReactNode => {
        if (headerKey !== "other" && headerKey !== "actions") {
            const customRenderHeader = customRendersHeaders.find((header) => header.headerKey === headerKey);
            return customRenderHeader ?
                customRenderHeader.render(item) :
                headerKey in item ?
                    item[headerKey as keyof BasicItem]
                    : ""
        } else {
            return headerKey === "other" ? getOtherCell() : getActionsCell();
        }
    }

    const getOtherCell = () =>
        <Box display="flex">
            {
                Object.entries(otherColumnProperties).map(([key, value]) => (
                    item[key as keyof BasicItem] ?
                        <div className={classes.otherInfo}>
                            <div><em className={classes.otherInfoText}>{value}</em></div> {item[key as keyof BasicItem]}
                        </div>
                        :
                        " "
                ))
            }
        </Box >

    const getActionsCell = () =>
        <>
            <IconButton color="primary" onClick={() => handleEditItem(item)}>
                <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteItem(item)}>
                <DeleteIcon />
            </IconButton>
        </>

    return (<Draggable key={item.id} draggableId={item.id} index={index}>
        {(
            draggableProvided: DraggableProvided) => {
            return (
                <TableRow ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                    {
                        Object.entries(headers).map(([headerKey]) =>
                            getTableCell(headerKey)
                        )
                    }
                </TableRow>
            );
        }}
    </Draggable>);
}

export default TableItem;


