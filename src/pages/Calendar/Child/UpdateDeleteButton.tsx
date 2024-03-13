import styled from 'styled-components';
import React from 'react';

const ButtonItem = styled.button`
    border: none;
    background-color: transparent;
    padding: 2px 8px;
`;
const AddButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex: 1;
`;
const AddButton = styled.button`
    border: none;
    background-color: transparent;
`;

interface Props {
    onUpdate: () => void;
    onDelete: () => void;
    addText?: string;
    onAdd?: () => void;
}
const UpdateDeleteButton = ({onUpdate, onDelete, onAdd, addText}: Props) => (
    <>
        <ButtonItem onClick={onUpdate}>{`[수정]`}</ButtonItem>
        <ButtonItem onClick={onDelete}>{`[삭제]`}</ButtonItem>
        {!!onAdd && !!addText && (
            <AddButtonContainer>
                <AddButton onClick={onAdd}>{`+ ${addText}`}</AddButton>
            </AddButtonContainer>
        )}
    </>
);

export default UpdateDeleteButton;
