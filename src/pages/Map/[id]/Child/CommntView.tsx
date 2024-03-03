import styled from 'styled-components';
import CommentUserItem from '../../../../components/ListItem/CommentUserItem';
import CommentItem from '../../../../components/ListItem/CommentItem';
import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';
import {
    deleteHospitalComment,
    postHospitalComment,
} from '../../../../api/Hospital';
import {CommentDto} from '../../../../types/server/hospital';

const Title = styled.h3`
    width: 100%;
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
const CommentListView = styled.ul`
    width: 100%;
    padding: 0;
`;

interface Props {
    hospitalId: string;
    commentList?: CommentDto[];
    refetchComment?: () => void;
}
const CommentView = ({hospitalId, commentList, refetchComment}: Props) => {
    const [score, setScore] = useState(5);
    const [comment, setComment] = useState('');

    const {mutate: postComment} = useMutation({
        mutationFn: postHospitalComment,
        onSuccess: () => {
            refetchComment?.();
        },
    });
    const {mutate: deleteComment} = useMutation({
        mutationFn: deleteHospitalComment,
        onSuccess: () => {
            refetchComment?.();
        },
    });

    const onTextHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postComment({
            hospitalId: hospitalId,
            content: comment,
            star: score,
        });
        setComment('');
    };

    return (
        <>
            <Title>병원 리뷰</Title>
            <FormContainer onSubmit={onSubmitSearch}>
                <CommentUserItem score={score} setScore={setScore} />
                <TextAreaContainer>
                    <InputView
                        placeholder="최대 100자 이하"
                        value={comment}
                        onChange={onTextHandler}
                    />
                    <SubmitButton type="submit">등록</SubmitButton>
                </TextAreaContainer>
            </FormContainer>

            <CommentListView>
                {commentList &&
                    commentList.length > 0 &&
                    commentList.map((item, index) => (
                        <CommentItem
                            key={item.hospitalCommentId}
                            content={item.content}
                            score={item.star}
                            depth={0}
                            firstItem={index === 0}
                            onDeleteComment={() =>
                                deleteComment({
                                    hospitalId,
                                    commentId: item.hospitalCommentId,
                                })
                            }
                        />
                    ))}
            </CommentListView>
        </>
    );
};

export default CommentView;
