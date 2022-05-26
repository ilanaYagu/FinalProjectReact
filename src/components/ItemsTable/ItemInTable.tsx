import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { Basic } from '../../classes/Basic';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomRenderers, otherColumnProperties, TableHeaders } from '../../types/managementtTableTypes';
import { makeStyles } from "@material-ui/styles";

interface ItemInTableProps {
    item: Basic;
    index: number;
    headers: TableHeaders<Basic>;
    customRenderers?: CustomRenderers<Basic>;
    otherColumn?: otherColumnProperties<Basic>;
    deleteItem(item: Basic): void;
    editItem(item?: Basic): void;
}

const useStyles = makeStyles({
    otherInfoText: {
        textDecoration: "underline",
        marginRight: "3% !important"

    },
    otherInfo: {
        margin: "4%"
    },
    tableCell: {
        whiteSpace: "nowrap",
        width: "12%"
    }
});

const ItemInTable = ({ item, index, headers, customRenderers, otherColumn, deleteItem, editItem }: ItemInTableProps) => {
    const classes = useStyles();

    return <Draggable key={item.id + " " + index} draggableId={item.id + " " + index} index={index}>
        {(
            draggableProvided: DraggableProvided) => {
            return (
                <TableRow ref={draggableProvided.innerRef} {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}>
                    {
                        Object.entries(headers).map(([headerKey]) => {
                            if (headerKey !== "other" && headerKey !== "actions") {
                                const customRenderer = customRenderers?.[headerKey];
                                return <TableCell className={classes.tableCell} align="center">
                                    {
                                        customRenderer ?
                                            customRenderer(item) : headerKey in item ? item[headerKey as keyof Basic]
                                                : ""
                                    }
                                </TableCell>
                            }
                            return <></>;
                        })
                    }
                    {
                        otherColumn &&
                        <TableCell className={classes.tableCell} align="center">
                            <Box display="flex">
                                {
                                    Object.entries(otherColumn).map(([key, value]) => {
                                        return item[key as keyof Basic] ?
                                            <div className={classes.otherInfo}>
                                                <div><em className={classes.otherInfoText}>{value}</em></div> {item[key as keyof Basic]}
                                            </div>
                                            :
                                            " "
                                    })
                                }
                            </Box>

                        </TableCell>
                    }
                    <TableCell className={classes.tableCell} align="center">
                        <IconButton color="primary" onClick={() => editItem(item)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteItem(item)}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        }}
    </Draggable>
};

export default ItemInTable;