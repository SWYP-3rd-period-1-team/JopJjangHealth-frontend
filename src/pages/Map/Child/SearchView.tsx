import React, {Dispatch, SetStateAction} from 'react';
import styled from 'styled-components';

const SearchForm = styled.form`
    width: 80%;
    display: flex;
    background-color: white;
    padding: 0 24px;
`;

const SearchInputBox = styled.input`
    width: 100%;
    padding: 24px 0;
    flex: 1;
    border: none;
    &:focus {
        outline: none;
    }
`;

const SearchButton = styled.button`
    background-color: transparent;
    border: none;
    color: #999999;
`;

interface Props {
    // useSearchQueryState: [string, Dispatch<SetStateAction<string>>];
    onSearch: () => void;
}
const SearchView = ({onSearch}: Props) => {
    // const [searchQuery, setSearchQuery] = useSearchQueryState;

    // const onTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchQuery(event.target.value);
    // };

    const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch();
    };

    return (
        <SearchForm onSubmit={onSubmitSearch}>
            {/* <SearchInputBox
                type={'text'}
                value={searchQuery}
                onChange={onTextHandler}
                placeholder="찾고자 하는 병원을 검색해보세요!"
                spellCheck={false}
            /> */}
            <SearchButton type={'submit'}>검색</SearchButton>
        </SearchForm>
    );
};

export default SearchView;
