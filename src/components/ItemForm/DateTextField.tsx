import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface DateTextFieldProps {
    label: string;
    value: string;
    setInput: (newInput: string) => void;
}

const useStyles = makeStyles({
    dateTextField: {
        width: "85%",
        backgroundColor: "inherit",
        color: "white"
    }
});

const DateTextField = ({ label, value, setInput }: DateTextFieldProps) => {
    const classes = useStyles();

    return (
        <TextField margin="normal" className={classes.dateTextField} label={label} type="datetime-local"
            InputLabelProps={{ shrink: true }} value={value.replace(" ", "T")}
            onChange={(event) => setInput(event.target.value.replace("T", " "))} />
    );
}

export default DateTextField;
