import styled from 'styled-components';
import {useState} from 'react';
import CommentUserItem from './CommentUserItem';
import {useMutation} from '@tanstack/react-query';
import {
    deleteHospitalComment,
    postHospitalReCommnet,
    reportsHospitalComment,
    updateHospitalComment,
} from '../../api/Hospital';
import {CommentDto} from '../../types/server/hospital';

const Container = styled.div<{$depth: number; $firstitem?: boolean}>`
    padding-left: ${props => `${props.$depth * 48}px`};
    border-top: ${props =>
        props.$depth === 0 && !props.$firstitem ? '1px solid #dadada' : 'none'};
    margin-top: 16px;
`;
const CommentListItem = styled.li`
    display: flex;
    width: 100%;
    padding: 16px 0;
    align-items: flex-start;
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
    hospitalId: string;
    commentId: number;
    refetchList: () => void;
    depth: number;
    firstItem?: boolean;
    content: string;
    score?: number;
    childComment?: CommentDto[];
}
const CommentItem = ({
    hospitalId,
    commentId,
    refetchList,
    depth,
    firstItem,
    content,
    score,
    childComment,
}: Props) => {
    const [toggleUpdate, setToggleUpdate] = useState(false);
    const [updateText, setUpdateText] = useState(content);
    const [toggleReComment, setToggleReComment] = useState(false);
    const [reCommentText, setReCommentText] = useState('');

    const onTextHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdateText(event.target.value);
    };

    const {mutate: deleteComment} = useMutation({
        mutationFn: deleteHospitalComment,
        onSuccess: () => {
            refetchList();
        },
    });
    const {mutate: updateComment} = useMutation({
        mutationFn: updateHospitalComment,
        onSuccess: () => {
            refetchList();
        },
    });
    const {mutate: reportComment} = useMutation({
        mutationFn: reportsHospitalComment,
        onSuccess: () => {
            refetchList();
        },
    });

    const onUpdateCommentHandler = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        updateComment({
            hospitalId,
            commentId,
            content: updateText,
        });
        setToggleUpdate(false);
    };

    const {mutate: postReComment} = useMutation({
        mutationFn: postHospitalReCommnet,
        onSuccess: () => {
            setReCommentText('');
            setToggleReComment(false);
            refetchList();
        },
    });

    const onPostReCommentHandler = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        postReComment({
            hospitalId,
            commentId,
            content: reCommentText,
        });
        setToggleUpdate(false);
    };

    const onTextReCommentHandler = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setReCommentText(event.target.value);
    };

    return (
        <Container $depth={depth} $firstitem={firstItem}>
            <CommentListItem>
                <CommentContent>
                    <CommentUserItem score={score} />
                </CommentContent>
                <CommentMenu>
                    <CommentMenuButton
                        onClick={() => setToggleReComment(prev => !prev)}
                    >
                        리댓
                    </CommentMenuButton>
                    <CommentMenuButton
                        onClick={() => setToggleUpdate(prev => !prev)}
                    >
                        수정
                    </CommentMenuButton>
                    <CommentMenuButton
                        onClick={() =>
                            deleteComment({
                                hospitalId,
                                commentId,
                            })
                        }
                    >
                        삭제
                    </CommentMenuButton>
                    <CommentMenuButton
                        onClick={() =>
                            reportComment({
                                hospitalId,
                                commentId,
                            })
                        }
                    >
                        신고
                    </CommentMenuButton>
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
            {toggleReComment && (
                <FormContainer onSubmit={onPostReCommentHandler}>
                    <CommentUserItem />
                    <TextAreaContainer>
                        <InputView
                            placeholder="최대 100자 이하"
                            value={reCommentText}
                            onChange={onTextReCommentHandler}
                        />
                        <SubmitButton type="submit">등록</SubmitButton>
                    </TextAreaContainer>
                </FormContainer>
            )}
            {!!childComment &&
                childComment.length > 0 &&
                childComment.map(item => (
                    <CommentItem
                        hospitalId={hospitalId}
                        commentId={item.hospitalCommentId}
                        refetchList={refetchList}
                        key={item.hospitalCommentId}
                        content={item.content}
                        depth={1}
                        childComment={item.children}
                    />
                ))}
        </Container>
    );
};

export default CommentItem;
