import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

export function SearchForm(){
    return (
        <SearchFormContainer>
            <input type="text" placeholder="Buscar transações" />

            <button type="submit">
                <MagnifyingGlass size={24} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}