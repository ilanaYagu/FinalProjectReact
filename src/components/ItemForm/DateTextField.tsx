import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface DateTextFieldProps<T> {
    label: string;
    field: keyof T;
    inputs: T;
    setInputs: (newInputs: T) => void;
}

const useStyles = makeStyles({
    dateTextField: {
        width: "85%",
        backgroundColor: "inherit",
        color: "white"
    }
});

const DateTextField = <T,>({ label, field, inputs, setInputs }: DateTextFieldProps<T>) => {
    const classes = useStyles();

    return (
        <TextField margin="normal" className={classes.dateTextField} label={label} type="datetime-local" defaultValue={inputs[field]}
            InputLabelProps={{ shrink: true }} value={(inputs[field] as unknown as string).replace(" ", "T")}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                setInputs({ ...inputs, [field]: event.target.value.replace("T", " ") });
            }} />
    );
}

export default DateTextField;
