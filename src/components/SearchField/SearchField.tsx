
import { TextField } from "@mui/material";


interface SearchFieldProps {
    setSearch(newSearch: string): void;
}

function SearchField({ setSearch }: SearchFieldProps) {

    return (
        <TextField label="Search" variant="standard" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />
    );
};

export default SearchField;