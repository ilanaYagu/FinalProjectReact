import { TextField } from "@mui/material";

export const getDateTextField = <T,>(classField: string, label: string, field: keyof Omit<T, "id" | "title" | "description">, inputs: Omit<T, "id" | "title" | "description">, setInputs: (newInputs: Omit<T, "id" | "title" | "description">) => void) => {
    return <TextField className={classField} label={label} type="datetime-local" defaultValue={inputs[field]}
        InputLabelProps={{ shrink: true }} value={(inputs[field] as unknown as string).replace(" ", "T")}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setInputs({ ...inputs, [field]: event.target.value.replace("T", " ") });
        }} />
}