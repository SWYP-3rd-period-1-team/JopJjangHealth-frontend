import styled from 'styled-components';
import {useState} from 'react';
import CommentUserItem from './CommentUserItem';
import {useMutation} from '@tanstack/react-query';

const CommentListItem = styled.li<{$depth: number; $firstitem?: boolean}>`
    display: flex;
    width: 100%;
    padding: 16px 0;
    align-items: flex-start;
    padding-left: ${props => `${props.$depth * 48}px`};
    border-top: ${props =>
        props.$depth === 0 && !props.$firstitem ? '1px solid #dadada' : 'none'};
`;
const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
const CommentListText = styled.p`
    margin: 16px 0 0 0;
    font-size: 14px;
    color: #555555;
`;
const CommentMenu = styled.div`
    display: flex;
    align-items: center;
`;
const CommentMenuButton = styled.button`
    background-color: transparent;
    border: none;
    color: #999999;
    cursor: pointer;
`;
const FormContainer = styled.form`
    margin-top: 12px;
    width: 100%;
`;
const TextAreaContainer = styled.div`
    display: flex;
    background-color: white;
    border: 1px solid #dadada;
    padding: 12px 16px;
    align-items: center;
    margin-top: 12px;
`;
const InputView = styled.textarea`
    width: 100%;
    background: transparent;
    border: none;
    resize: none;
    min-height: 60px;
    &:focus {
        outline: none;
    }
`;
const SubmitButton = styled.button`
    width: 60px;
    border-radius: 6px;
    background-color: #dadada;
    border: none;
    padding: 8px;
`;

interface Props {
    depth: number;
    firstItem?: boolean;
    content: string;
    score: number;
    onDeleteComment: () => void;
    onUpdateComment: (text: string) => void;
}
const CommentItem = ({
    depth,
    firstItem,
    content,
    score,
    onDeleteComment,
    onUpdateComment,
}: Props) => {
    const [toggleUpdate, setToggleUpdate] = useState(false);
    const [updateText, setUpdateText] = useState(content);

    const onTextHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdateText(event.target.value);
    };

    const onUpdateCommentHandler = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        onUpdateComment(updateText);
        setToggleUpdate(false);
    };

    return (
        <>
            <CommentListItem $depth={depth} $firstitem={firstItem}>
                <CommentContent>
                    <CommentUserItem score={score} />
                </CommentContent>
                <CommentMenu>
                    <CommentMenuButton
                        onClick={() => setToggleUpdate(prev => !prev)}
                    >
                        수정
                    </CommentMenuButton>
                    <CommentMenuButton onClick={onDeleteComment}>
                        삭제
                    </CommentMenuButton>
                    <CommentMenuButton>신고</CommentMenuButton>
                </CommentMenu>
            </CommentListItem>
            {toggleUpdate ? (
                <FormContainer onSubmit={onUpdateCommentHandler}>
                    <TextAreaContainer>
                        <InputView
                            placeholder="최대 100자 이하"
                            value={updateText}
                            onChange={onTextHandler}
                        />
                        <SubmitButton type="submit">등록</SubmitButton>
                    </TextAreaContainer>
                </FormContainer>
            ) : (
                <CommentListText>{content}</CommentListText>
            )}
        </>
    );
};

export default CommentItem;
